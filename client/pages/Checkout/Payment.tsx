import { useState, useRef, useCallback } from "react";
import { OrderState } from "@/data/Checkout";
import RedButton from "@/components/Checkout/RedButton";
import { BankDetails, FileUploadZone, OrderDetailsTable, OrderMetaBar } from "@/components/Checkout/PaymentFields";

interface PaymentPageProps {
  order: OrderState;
  orderNum: string;
  orderDate: string;
  onPlaceOrder: (file: File | null) => void;
}

export default function PaymentPage({ order, orderNum, orderDate, onPlaceOrder }: PaymentPageProps) {
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  return (
    <div className="max-w-[1080px] mx-auto px-7 pt-7 pb-20">
      <h1 className="text-3xl font-extrabold text-bni-red mb-7">
        Almost there! Just one more step to finish your order.
      </h1>

      <OrderMetaBar orderNum={orderNum} date={orderDate} order={order} />

      <div className="flex gap-8 items-start">
        {/* order details */}
        <div className="flex-1">
          <h2 className="text-2xl font-extrabold text-bni-red mb-4">Order details</h2>
          <OrderDetailsTable order={order} />
        </div>

        {/* bank details and upload field */}
        <div className="w-[360px] flex-shrink-0">
          <BankDetails />
          <FileUploadZone
            file={receiptFile}
            onFile={setReceiptFile}
            onRemove={() => setReceiptFile(null)}
          />
          <RedButton onClick={() => onPlaceOrder(receiptFile)} full>
            PLACE ORDER
          </RedButton>
        </div>
      </div>
    </div>
  );
}