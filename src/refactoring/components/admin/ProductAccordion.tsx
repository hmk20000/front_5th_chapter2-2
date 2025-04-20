import React from 'react';
import Accordion from '../Accordion';
import { Product } from '../../../types';

interface ProductAccordionProps {
  product: Product;
}
const ProductAccordion = ({ product }: ProductAccordionProps) => {
  const TITLE = `${product.name} - ${product.price}원 (재고: ${product.stock})`;
  return (
    <Accordion title={TITLE}>
      <div>
        <h2>상품 관리</h2>
      </div>
    </Accordion>
  );
};

export default ProductAccordion;
