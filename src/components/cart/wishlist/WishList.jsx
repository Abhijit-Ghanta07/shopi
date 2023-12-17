import React, { useContext, useMemo } from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";

import { WishlistProduct } from "../cartIndex";

const WishList = () => {
  // let fillteredItem = useMemo(() => {
  //   return productState.filter((item, i) => {
  //     return wishtState.includes(item?.id);
  //   });
  // }, [wishtState]);

  return (
    <>
      <Container>
        <Row className="gap-3">
          <Col>
            <Stack direction="horizontal" className="gap-3">
              {/* {fillteredItem.length > 0 ? (
                fillteredItem.map((item) => (
                  <WishlistProduct key={item?.id} product={item} />
                ))
              ) : (
                <p>wishlist Is Empty</p>
              )} */}
            </Stack>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
};

export default WishList;
