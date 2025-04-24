import { useState } from 'react';
import { Product } from '../../types';

export const useEditProduct = (
  onProductUpdate: (updatedProduct: Product) => void,
) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  const handleEditComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  return {
    editingProduct,
    handleEditProduct,
    handleEditComplete,
  };
};
