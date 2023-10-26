import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Passbook { 'transactionType' : string, 'amount' : number }
export interface _SERVICE {
  'getBalance' : ActorMethod<[], number>,
  'getTransactionList' : ActorMethod<[], Array<Passbook>>,
  'topUp' : ActorMethod<[number], undefined>,
  'withdraw' : ActorMethod<[number], undefined>,
}
