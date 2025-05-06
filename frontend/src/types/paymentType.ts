export interface paymentType {
  id: string;
  payment_intent: string;
  created: number;
  amount: number;
  status: string;
  metadata: {
    total_tickets: number;
  };
  billing_details: {
    name: string;
    email:string
  };
  payment_method_details:{
    card:{
      brand:string
      last4:number
    }
  }
}
