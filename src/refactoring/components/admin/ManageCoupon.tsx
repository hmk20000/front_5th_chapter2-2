import { useState } from 'react';
import { Coupon } from '../../../types';
import AddCouponForm from './AddCouponForm';
export const INITIAL_COUPON: Coupon = Object.freeze({
  name: '',
  code: '',
  discountType: 'percentage',
  discountValue: 0,
});

interface ManageCouponProps {
  coupons: Coupon[];
  onAddCoupon: (coupon: Coupon) => void;
}
/**
 * 쿠폰 관리 페이지
 * @param coupons 쿠폰 목록
 * @param onAddCoupon 쿠폰 추가 함수
 * @returns 쿠폰 관리 페이지
 */
const ManageCoupon = ({ coupons, onAddCoupon }: ManageCouponProps) => {
  // 쿠폰 추가 함수
  const handleAddCoupon = (newCoupon: Coupon) => {
    onAddCoupon(newCoupon);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
      <div className="bg-white p-4 rounded shadow">
        <AddCouponForm onAddCoupon={handleAddCoupon} />
        <div>
          <h3 className="text-lg font-semibold mb-2">현재 쿠폰 목록</h3>
          <div className="space-y-2">
            {coupons.map((coupon, index) => (
              <div
                key={index}
                data-testid={`coupon-${index + 1}`}
                className="bg-gray-100 p-2 rounded"
              >
                {coupon.name} ({coupon.code}):
                {coupon.discountType === 'amount'
                  ? `${coupon.discountValue}원`
                  : `${coupon.discountValue}%`}{' '}
                할인
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCoupon;
