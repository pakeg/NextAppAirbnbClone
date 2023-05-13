"use client";

import { Range } from "react-date-range";
import CalendarInput from "../inputs/CalendarInput";
import Button from "../Button";
import Currency from "../Currency";

interface IListingReservationProps {
  price: number;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<IListingReservationProps> = ({
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">
          <Currency price={price} />
        </div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <CalendarInput
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="flex flex-row items-center justify-between p-4 font-semibold text-lg">
        <div>Total:</div>
        <div>
          {new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
          }).format(totalPrice)}
        </div>
      </div>
      <hr />
      <Button label="Reserve" disabled={disabled} onClick={onSubmit} />
    </div>
  );
};

export default ListingReservation;
