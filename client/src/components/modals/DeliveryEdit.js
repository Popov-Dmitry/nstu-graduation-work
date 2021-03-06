import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import ToggleSwitch from "../ToggleSwitch";
import {positiveNumber} from "../../utils/productUtils";
import Checkbox from "../Checkbox";
import {useDispatch, useSelector} from "react-redux";
import {saveDelivery, setCurrentDelivery, updateDelivery} from "../../redux/actions";
import {blink} from "../../utils/uiUtils";

const DeliveryEdit = ({show, onHide}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer.user);
    const currentDelivery = useSelector(state => state.deliveryReducer.currentDelivery);
    const [deliveryVariant, setDeliveryVariant] = useState("");
    const [deliveryPriceIncluded, setDeliveryPriceIncluded] = useState(true);
    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const [deliveryPriceVariant, setDeliveryPriceVariant] = useState("");
    const [departureIndex, setDepartureIndex] = useState("");
    const [returnIndex, setReturnIndex] = useState("");
    const [packVariant, setPackVariant] = useState("");
    const [smsToSender, setSmsToSender] = useState(false);
    const [smsToRecipient, setSmsToRecipient] = useState(false);

    useEffect(() => {
        setDeliveryVariant(currentDelivery !== null ? currentDelivery.deliveryVariant : "");
        setDeliveryPriceIncluded(currentDelivery !== null ? currentDelivery.deliveryPriceIncluded : true);
        setDeliveryPrice(currentDelivery !== null ? currentDelivery.deliveryPrice : 0);
        setDeliveryPriceVariant(currentDelivery !== null && currentDelivery.deliveryPriceVariant ? currentDelivery.deliveryPriceVariant : "");
        setDepartureIndex(currentDelivery !== null && currentDelivery.departureIndex ? currentDelivery.departureIndex : "");
        setReturnIndex(currentDelivery !== null && currentDelivery.returnIndex ? currentDelivery.returnIndex : "");
        setPackVariant(currentDelivery !== null && currentDelivery.packVariant ? currentDelivery.packVariant : "");
        setSmsToSender(currentDelivery !== null && currentDelivery.service && currentDelivery.service.includes("41"));
        setSmsToRecipient(currentDelivery !== null && currentDelivery.service && currentDelivery.service.includes("42"));
    }, [currentDelivery]);

    const validation = () => {
        let errors = 0;
        if (deliveryVariant === "") {
            errors++;
            blink("delivery-variant");
        }
        if (!deliveryPriceIncluded) {
            if (deliveryVariant === "RUSSIAN_POST") {
                if (deliveryPriceVariant.trim().length < 1) {
                    blink("delivery-price-variant");
                    errors++;
                }
                if (departureIndex.trim().length < 1) {
                    blink("departure-index");
                    errors++;
                }
                if (packVariant.trim().length < 1) {
                    blink("pack-variant");
                    errors++;
                }
            }
        }
        return errors === 0;
    }

    const onSaveClick = () => {
        if (!validation()) {
            return;
        }
        let service = "";
        if (smsToSender && !smsToRecipient) {
            service = "41";
        }
        if (!smsToSender && smsToRecipient) {
            service = "42"
        }
        if (smsToSender && smsToRecipient) {
            service = "41,42"
        }
        if (currentDelivery !== null) {
            dispatch(updateDelivery(currentDelivery.id, deliveryVariant, deliveryPriceIncluded, deliveryPrice,
                deliveryPriceVariant, departureIndex.split(" ").join(""), returnIndex.split(" ").join(""),
                packVariant, service, user.id))
        }
        else {
            dispatch(saveDelivery(deliveryVariant, deliveryPriceIncluded, deliveryPrice,
                deliveryPriceVariant, departureIndex.split(" ").join(""), returnIndex.split(" ").join(""),
                packVariant, service, user.id));
        }
        setDeliveryVariant("");
        setDeliveryPriceIncluded(true);
        setDeliveryPrice(0);
        setDeliveryPriceVariant("");
        setDepartureIndex("");
        setReturnIndex("");
        setPackVariant("");
        setSmsToSender(false);
        setSmsToRecipient(false);
        onHide(false);
    }

    return (
        <Modal
            show={show}
            onHide={() => {
                if (currentDelivery !== null) {
                    setTimeout(() => dispatch(setCurrentDelivery(null)), 300);
                }
                onHide(false);
            }}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    ????????????????
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Form.Label className={"mt-2 opacity-95"}>?????????????? ???????????????? <span className={"text-danger"}>*</span></Form.Label>
                    <Form.Select
                        id={"delivery-variant"}
                        className={"border-radius-10 w-75"}
                        value={deliveryVariant}
                        onChange={e => {
                            setDeliveryPriceIncluded(true);
                            setDeliveryPrice(0);
                            setDeliveryPriceVariant("");
                            setDepartureIndex("");
                            setReturnIndex("");
                            setPackVariant("");
                            setSmsToSender(false);
                            setSmsToRecipient(false);
                            setDeliveryVariant(e.target.value);
                        }}
                    >
                        <option hidden>?????????????? ????????????????</option>
                        <option value="MY">??????</option>
                        <option value="RUSSIAN_POST">?????????? ????????????</option>
                    </Form.Select>
                    {deliveryVariant.length > 0 &&
                        <div>
                            <Form.Label className={"mt-2 opacity-95"}>
                                ???????????????? ?? ?????????????????? <span className={"text-danger"}>*</span>
                            </Form.Label>
                            <ToggleSwitch
                                name={"deliveryPriceIncluded"}
                                checked={deliveryPriceIncluded}
                                onChange={(e) => {
                                    setDeliveryPrice(0);
                                    setDeliveryPriceVariant("");
                                    setDepartureIndex("");
                                    setReturnIndex("");
                                    setPackVariant("");
                                    setSmsToSender(false);
                                    setSmsToRecipient(false);
                                    setDeliveryPriceIncluded(e.target.checked);
                                }}
                            />
                            {!deliveryPriceIncluded && deliveryVariant === "MY" &&
                                <div>
                                    <Form.Label className={"mt-2 opacity-95"}>
                                        ?????????????????? ???????????????? <span className={"text-danger"}>*</span>
                                    </Form.Label>
                                    <Form.Control
                                        id={"my-delivery-price"}
                                        className={"border-radius-10"}
                                        placeholder="?????????????????? ????????????????"
                                        type={"number"}
                                        value={deliveryPrice}
                                        onChange={e => {
                                            positiveNumber(e);
                                            setDeliveryPrice(e.target.value);
                                        }}
                                    />
                                </div>
                            }
                            {!deliveryPriceIncluded && deliveryVariant === "RUSSIAN_POST" &&
                                <div>
                                    <Form.Label className={"mt-2 opacity-95"}>
                                        ?????????????????? ???????????????? <span className={"text-danger"}>*</span>
                                    </Form.Label>
                                    <Form.Select
                                        id={"delivery-price-variant"}
                                        className={"border-radius-10 w-75"}
                                        value={deliveryPriceVariant}
                                        onChange={e => {
                                            setDeliveryPrice(0);
                                            setDepartureIndex("");
                                            setReturnIndex("");
                                            setPackVariant("");
                                            setSmsToSender(false);
                                            setSmsToRecipient(false);
                                            setDeliveryPriceVariant(e.target.value);
                                        }}
                                    >
                                        <option hidden>?????????????????? ????????????????</option>
                                        <option value="FIXED">??????????????????????????</option>
                                        <option value="CALCULATE">???????????????????????? ?????? ?????????????? ??????????????????????</option>
                                    </Form.Select>
                                    {deliveryPriceVariant === "FIXED" &&
                                        <div>
                                            <Form.Control
                                                id={"fixed-delivery-price"}
                                                className={"mt-3 border-radius-10"}
                                                placeholder="?????????????????? ????????????????"
                                                type={"number"}
                                                value={deliveryPrice}
                                                onChange={e => {
                                                    positiveNumber(e);
                                                    setDeliveryPrice(e.target.value);
                                                }}
                                            />
                                        </div>
                                    }
                                    {deliveryPriceVariant === "CALCULATE" &&
                                        <div>
                                            <Form.Label className={"mt-2 opacity-95"}>
                                                ???????????? ?????????? ?????????????????????? <span className={"text-danger"}>*</span>
                                            </Form.Label>
                                            <Form.Control
                                                id={"departure-index"}
                                                className={"border-radius-10"}
                                                placeholder="???????????? ?????????? ??????????????????????"
                                                value={departureIndex}
                                                onChange={e => setDepartureIndex(e.target.value)}
                                            />
                                            <Form.Label className={"mt-2 opacity-95"}>???????????? ?????????? ???????????????? ????????????????</Form.Label>
                                            <Form.Control
                                                className={"border-radius-10"}
                                                placeholder="???????????? ?????????? ???????????????? ????????????????"
                                                value={returnIndex}
                                                onChange={e => setReturnIndex(e.target.value)}
                                            />
                                            <Form.Label className={"mt-2 opacity-95"}>
                                                ???????????????? <span className={"text-danger"}>*</span>
                                            </Form.Label>
                                            <Form.Select
                                                id={"pack-variant"}
                                                className={"border-radius-10 w-75"}
                                                value={packVariant}
                                                onChange={e => setPackVariant(e.target.value)}
                                            >
                                                <option hidden>????????????????</option>
                                                <option value="10">?????????????? ??S??</option>
                                                <option value="11">?????????? ???????????????????????????? ??S??</option>
                                                <option value="12">?????????????? ?? ????????????????-???????????????????? ?????????????? ??S??</option>
                                                <option value="20">?????????????? ??M??</option>
                                                <option value="21">?????????? ???????????????????????????? ??M??</option>
                                                <option value="22">?????????????? ?? ????????????????-???????????????????? ?????????????? ??M??</option>
                                                <option value="30">?????????????? ??L??</option>
                                                <option value="31">?????????? ???????????????????????????? ??L??</option>
                                                <option value="40">?????????????? ??XL??</option>
                                                <option value="41">?????????? ???????????????????????????? ??XL??</option>
                                            </Form.Select>
                                            <a
                                                className={"fst-italic"}
                                                href="https://www.pochta.ru/support/post-rules/package-materials"
                                                target="_blank"
                                            >
                                                ???????????????????? ??????????????
                                            </a>
                                            <div className={"mt-2"}>
                                                <div>
                                                    <Checkbox
                                                        name={"smsToSender"}
                                                        checked={smsToSender}
                                                        onChange={(e) => setSmsToSender(e.target.checked)}
                                                        text={"?????????? ?????? ?????????????????????? ??????????????????????"}
                                                    />
                                                </div>
                                                <div>
                                                    <Checkbox
                                                        name={"smsToRecipient"}
                                                        checked={smsToRecipient}
                                                        onChange={(e) => setSmsToRecipient(e.target.checked)}
                                                        text={"?????????? ?????? ?????????????????????? ????????????????????"}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    }
                </div>
                <Button
                    variant={"main"}
                    className={"mt-3 border-radius-10 float-end"}
                    onClick={onSaveClick}
                >
                    ??????????????????
                </Button>
            </Modal.Body>
        </Modal>
    );
};

export default DeliveryEdit;