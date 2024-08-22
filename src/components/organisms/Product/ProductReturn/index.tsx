import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ReturnPolicy from './ReturnPolicy';
import ChooseProduct from './ChooseProduct';
import {Button, useNavigate} from '~/components/elemental';
import Explanation from './Explanation';
import {useCreateReturnRequest} from '../hook';
import SubmitedRequestModal from './Modals/SubmitedRequestModal';

const ProductReturn = ({content}) => {
  const [page, setPage] = useState(1);
  const [returnCode, setReturnCode] = useState(null);
  const [products, setProducts] = useState([]);

  const {mutate, isLoading} = useCreateReturnRequest();

  
  const submit = data => {
    const input = products.map((i) => {return {
      shoppingCardDetailId: i?.id,
      reason: data?.reason?.value || "reason",
      explanation: data?.explanation,
      photos: JSON.stringify(data?.photos),
      quantity: Number(data?.quantity) || 1,
    };})
    
    mutate(
      {input},
      {
        onSuccess(data: any, variables, context) {
          if (data?.ecommerce_createReturnRequest?.status?.code === 1) {
            setReturnCode(data?.ecommerce_createReturnRequest?.result?.id);
          }
        },
      },
    );
  };

  const showCurrentPage = {
    1: <ReturnPolicy content={content} onChange={() => setPage(2)} />,
    2: (
      <ChooseProduct onChange={i => [setPage(i?.page), setProducts(i?.ids)]} />
    ),
    3: (
      <Explanation
        products={products}
        isLoading={isLoading}
        onChange={i => [submit(i)]}
      />
    ),
  };

  return (
    <>
      {showCurrentPage[page]}
      <SubmitedRequestModal
        id={returnCode}
        onClose={() => setReturnCode(null)}
      />
    </>
  );
};

export default ProductReturn;

const styles = StyleSheet.create({});
