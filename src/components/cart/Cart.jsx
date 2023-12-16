import React, { useContext, useMemo } from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import { StoreContext } from "../../context/store";
import CartProduct from "./CartProduct";
import { useSelector } from "react-redux";

const Cart = () => {
  const { productData } = useSelector((store) => store.product);
  const { productsID } = useSelector((store) => store.cart);
  let fillteredItem = useMemo(() => {
    return productData.filter((product, i) => productsID?.includes(product.id));
  }, [productsID]);

  return (
    <>
      <Container fluid="xl" className="mt-4">
        <Row className="gap-3">
          <Col>
            <Stack direction="vertical" className="gap-3">
              {fillteredItem.length > 0 ? (
                fillteredItem.map((item) => (
                  <CartProduct key={item?.id} product={item} />
                ))
              ) : (
                <p>Cart Is Empty</p>
              )}
            </Stack>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
};

export default Cart;
