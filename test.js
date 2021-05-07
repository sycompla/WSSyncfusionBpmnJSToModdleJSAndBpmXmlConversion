import fs from 'fs';
import Enumerable from "linq";
import BpmnModdel from 'bpmn-moddle';
import { Ac4yKeyValueMemory } from './Ac4y.js'

const moddle = new BpmnModdel();

async function moddleBasic(flowElements, planeElement, filename) {

    //console.log(flowElements, "\n", planeElement);
    try {

        let definitions = moddle.create("bpmn:Definitions");

        let process = moddle.create("bpmn:Process", {
            id: "process",
            isExecutable: false,
            flowElements: flowElements
        });

        let plane = moddle.create("bpmndi:BPMNPlane", {
            id: "plane",
            bpmnElement: process,
            planeElement: planeElement
        });

        let diagram = moddle.create("bpmndi:BPMNDiagram", {
            id: "diagram",
            plane: plane
        });

        await definitions.get('rootElements').push(process);

        await definitions.get('diagrams').push(diagram);

        const {
            xml: xmlString
        } = await moddle.toXML(definitions);

        fs.writeFileSync("./" + filename, xmlString);

    } catch (error)
    {
        console.log(error);
    }

    //console.log(xmlString);

} // moddleBasic

async function linqTest(fileName, connectorFileName) {

    let json = fs.readFileSync(fileName + ".json", "utf-8");
    let connectorJson = fs.readFileSync(connectorFileName + ".json", "utf-8");

    let nodeArray = JSON.parse(json);
    let connectorArray = JSON.parse(connectorJson);

    let flowElementsKeyValueDictionary = new Ac4yKeyValueMemory();
    let flowElementConnectorsKeyValueDisctionary = new Ac4yKeyValueMemory();

    let flowElements = await Enumerable.from(nodeArray)
        .select((node) => {

            if(node.shape.shape == "Event") {

                if(node.shape.event.event == "Start") {

                    return moddle.create("bpmn:StartEvent", {
                        id: node.id
                    });

                } else if (node.shape.event.event == "End") {

                    return moddle.create("bpmn:EndEvent", {
                        id: node.id
                    });

                }

            } else if (node.shape.shape == "Activity") {

                if(node.shape.activity.activity == "SubProcess" && node.shape.activity.subProcess.boundary == "Call") {

                    return moddle.create("bpmn:CallActivity", {
                        id: node.id,
                        name: (node.annotations != undefined && node.annotations.length > 0) ? node.annotations[0].content : ""
                    })

                } else if (node.shape.activity.activity == "Task" && node.shape.activity.task.type == "Service") {

                    return moddle.create("bpmn:ServiceTask", {
                        id: node.id,
                        name: (node.annotations != undefined && node.annotations.length > 0) ? node.annotations[0].content : ""
                    })

                }

                return moddle.create("bpmn:Task", {
                    id: node.id,
                    name: (node.annotations != undefined && node.annotations.length > 0) ? node.annotations[0].content : ""
                })



            } else if(node.shape.shape == "Gateway") {

                if (node.shape.gateway.type == "Exclusive") {

                    return moddle.create("bpmn:ExclusiveGateway", {
                        id: node.id,
                        name: (node.annotations != undefined && node.annotations.length > 0) ? node.annotations[0].content : ""
                    })

                }

            }

        }).toArray(); // flowElements

    flowElements.forEach((element) => {

        flowElementsKeyValueDictionary.put(element.id, element);

    }) // flowElments.forEach()

    let flowElementsConnectors = Enumerable.from(connectorArray)
        .select((connector) => {

            let sequenceFlow = moddle.create("bpmn:SequenceFlow", {
                id: connector.id,
                name: (connector.annotations != undefined && connector.annotations.length > 0) ? connector.annotations[0].content : undefined,
                sourceRef: flowElementsKeyValueDictionary.get(connector.sourceID),
                targetRef: flowElementsKeyValueDictionary.get(connector.targetID)
            })

            flowElementsKeyValueDictionary.get(connector.sourceID).outgoing = sequenceFlow;

            flowElementsKeyValueDictionary.get(connector.targetID).incoming = sequenceFlow;

            return sequenceFlow;

        }).toArray(); // flowElementsConnectors

    flowElementsConnectors.forEach((element) => {

        flowElementConnectorsKeyValueDisctionary.put(element.id, element);

    }) // flowElementsConnectors.forEach()

    let planeElement = await Enumerable.from(nodeArray)
        .select((node) => {

            return moddle.create("bpmndi:BPMNShape", {
                id: node.id + "Shape",
                bpmnElement: flowElementsKeyValueDictionary.get(node.id),
                bounds: moddle.create("dc:Bounds", {
                    x: node.offsetX,
                    y: node.offsetY,
                    width: node.width,
                    height: node.height
                })
            });


        }).toArray(); // planeElement

    let planeElementConnectors = Enumerable.from(connectorArray)
        .select((connector) => {

            return moddle.create("bpmndi:BPMNEdge", {
                id: connector.id + "Edge",
                bpmnElement: flowElementConnectorsKeyValueDisctionary.get(connector.id)
            });

        }).toArray() // planeElementConnectors

    let flowElementsReturn = flowElementsKeyValueDictionary.getArrayFromValues().concat(flowElementConnectorsKeyValueDisctionary.getArrayFromValues());

    let planeElementReturn = planeElement.concat(planeElementConnectors);

    moddleBasic(flowElementsReturn, planeElementReturn, "generatedXml/osszetettebbPeldaGateway.xml");

} // linqTest

linqTest("./json/osszetettebbPeldaGateway", "./json/osszetettebbPeldaGatewayConnectors");
