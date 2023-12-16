import React, { useContext, useMemo } from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import { StoreContext } from "../../context/store";
import CartProduct from "./CartProduct";

const Cart = () => {
  const {
    product: [productState],
    cart: [cartState],
  } = useContext(StoreContext);

  let fillteredItem = useMemo(() => {
    return productState.filter((product, i) => {
      return cartState.filter((cart) => cart.productId == product.id);
    });
  }, [cartState]);

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
