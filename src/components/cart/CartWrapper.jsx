import React, { useMemo } from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import { CartProduct, WishList } from "./cartIndex";

import { useSelector } from "react-redux";

const CartWrapper = () => {
  const { productData } = useSelector((store) => store.product);
  const { productsID } = useSelector((store) => store.cart);
  let fillteredItem = useMemo(() => {
    return productData.filter((product, i) => productsID?.includes(product.id));
  }, [productsID]);

  return (
    <>
      <Container fluid="xl" classNameName="mt-4">
        <Row classNameName="gap-3">
          <Col>
            <Stack direction="vertical" classNameName="gap-3">
              {fillteredItem.length > 0 &&
                fillteredItem.map((item) => (
                  <CartProduct key={item?.id} product={item} />
                ))}
            </Stack>
            <WishList />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
};

export default CartWrapper;
