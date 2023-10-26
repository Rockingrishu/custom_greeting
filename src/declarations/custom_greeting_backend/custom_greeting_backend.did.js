export const idlFactory = ({ IDL }) => {
  const Passbook = IDL.Record({
    'transactionType' : IDL.Text,
    'amount' : IDL.Float64,
  });
  return IDL.Service({
    'getBalance' : IDL.Func([], [IDL.Float64], ['query']),
    'getTransactionList' : IDL.Func([], [IDL.Vec(Passbook)], ['query']),
    'topUp' : IDL.Func([IDL.Float64], [], ['oneway']),
    'withdraw' : IDL.Func([IDL.Float64], [], ['oneway']),
  });
};
export const init = ({ IDL }) => { return []; };
