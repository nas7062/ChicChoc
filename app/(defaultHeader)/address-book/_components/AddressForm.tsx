"use client";

import InputField from "@/app/components/InputField";
import { addAddress, updateAddress } from "@/app/actions/address";
import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type InitialValues = {
  label: string;
  address: string;
  phone: string;
  isDefault: boolean;
};

type Props =
  | {
    mode: "create";
    initialValues: InitialValues;
  }
  | {
    mode: "edit";
    addressId: string;
    initialValues: InitialValues;
  };

const initialState = { ok: false } as const;

export default function AddressForm(props: Props) {
  const router = useRouter();

  const [label, setLabel] = useState(props.initialValues.label);
  const [address, setAddress] = useState(props.initialValues.address);
  const [phone, setPhone] = useState(props.initialValues.phone);
  const [isDefault, setIsDefault] = useState(props.initialValues.isDefault);

  // mode에 따라 액션 분기
  const actionFn =
    props.mode === "edit"
      ? updateAddress.bind(null, props.addressId)
      : addAddress;

  const [state, action, pending] = useActionState(actionFn as any, initialState);

  // 성공 시 한번만 이동
  const done = useRef(false);
  useEffect(() => {
    if (!state?.ok) return;
    if (done.current) return;
    done.current = true;

    router.push("/address-book");
    router.refresh();
  }, [state?.ok, router]);

  return (
    <form action={action} className="flex flex-col gap-2">
      <h2 className="text-center text-xl font-semibold">
        {props.mode === "edit" ? "배송지 수정" : "배송지 추가"}
      </h2>

      <InputField
        variant="box"
        label="배송지명"
        value={label}
        name="label"
        onChange={(e) => setLabel(e.target.value)}
        placeholder="배송지명을 입력해주세요. (예 : 집, 회사)"
      />
      {"fieldErrors" in (state as any) && (state as any)?.fieldErrors?.label && (
        <p className="text-xs text-red-500">{(state as any).fieldErrors.label}</p>
      )}

      <InputField
        variant="box"
        label="주소"
        value={address}
        name="address"
        onChange={(e) => setAddress(e.target.value)}
        placeholder="건물명, 도로명 또는 지번 검색"
      />
      {"fieldErrors" in (state as any) &&
        (state as any)?.fieldErrors?.address && (
          <p className="text-xs text-red-500">
            {(state as any).fieldErrors.address}
          </p>
        )}

      <InputField
        variant="box"
        label="휴대폰번호"
        value={phone}
        name="phone"
        onChange={(e) => setPhone(e.target.value)}
        placeholder="휴대폰 번호를 입력해주세요."
      />
      {"fieldErrors" in (state as any) && (state as any)?.fieldErrors?.phone && (
        <p className="text-xs text-red-500">{(state as any).fieldErrors.phone}</p>
      )}

      {("formError" in (state as any) && (state as any)?.formError) ? (
        <p className="text-xs text-red-500">{(state as any).formError}</p>
      ) : null}

      <div className="flex items-center gap-2 pt-2">
        <input
          id="isDefault"
          type="checkbox"
          name="isDefault"
          checked={isDefault}
          onChange={(e) => setIsDefault(e.target.checked)}
        />
        <label htmlFor="isDefault" className="text-xs">
          기본 배송지 설정
        </label>
      </div>

      <button
        disabled={pending}
        className="self-center mt-4 w-full px-4 py-2 cursor-pointer text-sm bg-blue-400 text-white hover:bg-blue-500 transition-colors duration-200 rounded-2xl disabled:opacity-50"
      >
        {pending
          ? props.mode === "edit"
            ? "수정 중..."
            : "추가 중..."
          : props.mode === "edit"
            ? "수정하기"
            : "추가하기"}
      </button>
    </form>
  );
}
