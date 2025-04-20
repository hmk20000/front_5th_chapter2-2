import { useState } from 'react';
import NewProduct from './NewProduct';
import { Discount, Product } from '../../../types';
import AddDiscountForm from './AddDiscountForm';
import { Card, H2, H4 } from '../shared';
interface ManageProductProps {
  products: Product[];
  onProductAdd: (product: Product) => void;
  onProductUpdate: (updatedProduct: Product) => void;
}
const ManageProduct = ({
  products,
  onProductAdd,
  onProductUpdate,
}: ManageProductProps) => {
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  const handleProductNameUpdate = (productId: string, newName: string) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, name: newName };
      setEditingProduct(updatedProduct);
    }
  };

  const handlePriceUpdate = (productId: string, newPrice: number) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, price: newPrice };
      setEditingProduct(updatedProduct);
    }
  };

  const handleStockUpdate = (productId: string, newStock: number) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = { ...updatedProduct, stock: newStock };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  const handleAddDiscount = (productId: string, discount: Discount) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct && editingProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: [...updatedProduct.discounts, discount],
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  const handleRemoveDiscount = (productId: string, index: number) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: updatedProduct.discounts.filter((_, i) => i !== index),
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  const handleEditComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  return (
    <div>
      <H2>상품 관리</H2>
      <NewProduct onProductAdd={onProductAdd} />
      <div className="space-y-2">
        {products.map((product, index) => (
          <Card key={product.id} data-testid={`product-${index + 1}`}>
            <button
              data-testid="toggle-button"
              onClick={() => toggleProductAccordion(product.id)}
              className="w-full text-left font-semibold"
            >
              {product.name} - {product.price}원 (재고: {product.stock})
            </button>
            {openProductIds.has(product.id) && (
              <div className="mt-2">
                {editingProduct && editingProduct.id === product.id ? (
                  <div>
                    <div className="mb-4">
                      <label className="block mb-1">상품명: </label>
                      <input
                        type="text"
                        value={editingProduct.name}
                        onChange={(e) =>
                          handleProductNameUpdate(product.id, e.target.value)
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1">가격: </label>
                      <input
                        type="number"
                        value={editingProduct.price}
                        onChange={(e) =>
                          handlePriceUpdate(
                            product.id,
                            parseInt(e.target.value),
                          )
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1">재고: </label>
                      <input
                        type="number"
                        value={editingProduct.stock}
                        onChange={(e) =>
                          handleStockUpdate(
                            product.id,
                            parseInt(e.target.value),
                          )
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <ProductDiscount
                      editingProduct={editingProduct}
                      handleRemoveDiscount={handleRemoveDiscount}
                      handleAddDiscount={handleAddDiscount}
                    />
                    <button
                      onClick={handleEditComplete}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
                    >
                      수정 완료
                    </button>
                  </div>
                ) : (
                  <div>
                    {product.discounts.map((discount, index) => (
                      <div key={index} className="mb-2">
                        <span>
                          {discount.quantity}개 이상 구매 시{' '}
                          {discount.rate * 100}% 할인
                        </span>
                      </div>
                    ))}
                    <button
                      data-testid="modify-button"
                      onClick={() => handleEditProduct(product)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
                    >
                      수정
                    </button>
                  </div>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageProduct;

/**
 * 상품 할인 정보 컴포넌트
 * @param editingProduct 수정할 상품
 * @param handleRemoveDiscount 할인 정보 삭제 함수
 * @param handleAddDiscount 할인 정보 추가 함수
 * @returns 상품 할인 정보 컴포넌트
 */
const ProductDiscount = ({
  editingProduct,
  handleRemoveDiscount,
  handleAddDiscount,
}: {
  editingProduct: Product;
  handleRemoveDiscount: (productId: string, index: number) => void;
  handleAddDiscount: (productId: string, discount: Discount) => void;
}) => {
  return (
    <div>
      <H4>할인 정보</H4>
      {editingProduct.discounts.map((discount, index) => (
        <div key={index} className="flex justify-between items-center mb-2">
          <span>
            {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
          </span>
          <button
            onClick={() => handleRemoveDiscount(editingProduct.id, index)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            삭제
          </button>
        </div>
      ))}
      {/* 할인 추가 폼 */}
      <AddDiscountForm
        productId={editingProduct.id}
        onAddDiscount={handleAddDiscount}
      />
    </div>
  );
};
