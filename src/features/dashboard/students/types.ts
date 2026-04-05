export type PaymentStatus = 'Fully Paid' | 'Partial' | 'Debtor';

export interface Student {
    id: string;
    name: string;
    classGroup: string;
    parentName: string;
    parentWhatsapp: string;
    paymentStatus: PaymentStatus;
    totalFee: number;
    amountPaid: number;
}
