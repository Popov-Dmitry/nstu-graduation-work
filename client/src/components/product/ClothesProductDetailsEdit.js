import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {addProductDetails, updateClothesDetails} from "../../redux/actions";
import {blink} from "../../utils/uiUtils";

const ClothesProductDetailsEdit = ({step, setStep, product}) => {
    const dispatch = useDispatch();
    const [brand, setBrand] = useState((product && product.brand) ? product.brand : "");
    const [title, setTitle] = useState((product && product.title) ? product.title : "");
    const [description, setDescription] = useState((product && product.description) ? product.description : "");
    const [composition, setComposition] = useState((product && product.composition) ? product.composition : "");
    const [category, setCategory] = useState((product && product.category) ? product.category : "");
    const [season, setSeason] = useState((product && product.season) ? product.season : "");
    const [type, setType] = useState((product && product.type) ? product.type : "");
    const [productionCountry, setProductionCountry] =
        useState((product && product.productionCountry) ? product.productionCountry : "");
    const [care, setCare] = useState((product && product.care) ? product.care : "");
    const [style, setStyle] = useState((product && product.style) ? product.style : "");

    const validation = () => {
        let errors = 0;
        if (brand.trim().length < 1) {
            blink("brand");
            errors++;
        }
        if (title.trim().length < 3) {
            blink("title");
            errors++;
        }
        if (description.trim().length < 5) {
            blink("description");
            errors++;
        }
        if (composition.trim().length < 5) {
            blink("composition");
            errors++
        }
        if (category === "") {
            blink("category");
            errors++
        }
        if (season === "") {
            blink("season");
            errors++
        }
        if (type.trim().length < 1) {
            blink("type");
            errors++
        }
        return errors === 0;
    }

    return (
        <div>
            <Form.Label className={"opacity-95"}>?????????? <span className={"text-danger"}>*</span></Form.Label>
            <Form.Control
                id={"brand"}
                className={"mb-2 border-radius-10 w-50"}
                placeholder="??????????"
                value={brand}
                onChange={e => setBrand(e.target.value)}
            />
            <Form.Label className={"opacity-95"}>???????????????? ???????????? <span className={"text-danger"}>*</span></Form.Label>
            <Form.Control
                id={"title"}
                className={"mb-2 border-radius-10 w-50"}
                placeholder="???????????????? ????????????"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <Form.Label className={"opacity-95"}>???????????????? ???????????? <span className={"text-danger"}>*</span></Form.Label>
            <Form.Control
                id={"description"}
                className={"mb-2 border-radius-10 w-50 resize-none"}
                as={"textarea"}
                rows={3}
                placeholder="???????????????? ????????????"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <Form.Label className={"opacity-95"}>???????????? <span className={"text-danger"}>*</span></Form.Label>
            <Form.Control
                id={"composition"}
                className={"mb-2 border-radius-10 w-50"}
                placeholder="????????????"
                value={composition}
                onChange={e => setComposition(e.target.value)}
            />
            <Form.Label className={"opacity-95"}>?????? <span className={"text-danger"}>*</span></Form.Label>
            <Form.Select
                id={"category"}
                className={"mb-2 border-radius-10 w-25"}
                value={category}
                onChange={e => setCategory(e.target.value)}
            >
                <option hidden>??????</option>
                <option value="MEN">??????????????</option>
                <option value="WOMEN">??????????????</option>
                <option value="UNISEX">??????????????</option>
                <option value="BOYS">????????????????</option>
                <option value="GIRLS">??????????????</option>
            </Form.Select>
            <Form.Label className={"opacity-95"}>?????????? <span className={"text-danger"}>*</span></Form.Label>
            <Form.Select
                id={"season"}
                className={"mb-2 border-radius-10 w-25"}
                value={season}
                onChange={e => setSeason(e.target.value)}
            >
                <option hidden>??????????</option>
                <option value="WINTER">????????</option>
                <option value="SPRING">??????????</option>
                <option value="SUMMER">????????</option>
                <option value="AUTUMN">??????????</option>
                <option value="WINTER_SPRING">????????-??????????</option>
                <option value="SPRING_SUMMER">??????????-????????</option>
                <option value="SUMMER_AUTUMN">????????-??????????</option>
                <option value="AUTUMN_WINTER">??????????-????????</option>
                <option value="SPRING_AUTUMN">??????????-??????????</option>
                <option value="AUTUMN_SPRING">??????????-??????????</option>
                <option value="DEMISEASON">??????????????????</option>
                <option value="ANY">??????????</option>
            </Form.Select>
            <Form.Label className={"opacity-95"}>?????? ???????????? <span className={"text-danger"}>*</span></Form.Label>
            <Form.Control
                id={"type"}
                className={"border-radius-10 w-50"}
                placeholder="?????? ????????????"
                value={type}
                onChange={e => setType(e.target.value)}
            />
            <div className={"mb-2 fw-light fst-italic"}>????????????????: ????????????, ????????????????, ????????????,...</div>
            <Form.Label className={"opacity-95"}>?????????? ????????????</Form.Label>
            <Form.Control
                className={"mb-2 border-radius-10 w-50"}
                placeholder="?????????? ????????????"
                value={style}
                onChange={e => setStyle(e.target.value)}
            />
            <Form.Label className={"opacity-95"}>???????????? ??????????????????????????</Form.Label>
            <Form.Control
                className={"mb-2 border-radius-10 w-50"}
                placeholder="???????????? ??????????????????????????"
                value={productionCountry}
                onChange={e => setProductionCountry(e.target.value)}
            />
            <Form.Label className={"opacity-95"}>???????? ???? ??????????????</Form.Label>
            <Form.Control
                className={"mb-2 border-radius-10 w-50"}
                placeholder="???????? ???? ??????????????"
                value={care}
                onChange={e => setCare(e.target.value)}
            />
            <Button
                variant={"main"}
                className={"mt-2 mb-4"}
                onClick={() => {
                    if (!validation()) {
                        return;
                    }
                    if (product) {
                        dispatch(updateClothesDetails(product.id, brand, title, description, composition, category,
                            season, type, productionCountry, care, style, null));
                    }
                    else {
                        const productDetails = { brand, title, description, composition, category,
                            season, type, productionCountry, care, style }
                        dispatch(addProductDetails(productDetails));
                        setStep(step + 1);
                    }
                }}
            >
                {product ? "??????????????????" : "????????????????????"}
            </Button>
        </div>
    );
};

export default ClothesProductDetailsEdit;