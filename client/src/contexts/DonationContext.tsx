import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { Bitcoin, CreditCard, type LucideIcon } from "lucide-react";
import { toast } from "sonner";
import DonationModal from "@/components/donation/DonationModal";

type PaymentMethod =
  | "card"
  | "paypal"
  | "crypto_btc"
  | "crypto_eth"
  | "crypto_usdt"
  | "bank_transfer";

type DonationContextValue = {
  showDonationModal: boolean;
  openDonation: () => void;
  closeDonation: () => void;
  donationStep: 1 | 2;
  setDonationStep: (step: 1 | 2) => void;
  donorName: string;
  setDonorName: (v: string) => void;
  donorEmail: string;
  setDonorEmail: (v: string) => void;
  donationAmount: string;
  setDonationAmount: (v: string) => void;
  donationCampaign: string;
  setDonationCampaign: (v: string) => void;
  donationType: "one-time" | "recurring" | "monthly";
  setDonationType: (v: "one-time" | "recurring" | "monthly") => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (v: PaymentMethod) => void;
  isAnonymous: boolean;
  setIsAnonymous: (v: boolean) => void;
  donorMessage: string;
  setDonorMessage: (v: string) => void;
  donationTxnRef: string;
  isDonationProcessing: boolean;
  handleDonate: () => void;
  paymentMethodLabels: Record<string, { label: string; icon: LucideIcon }>;
};

const DonationContext = createContext<DonationContextValue | null>(null);

export function DonationProvider({ children }: { children: ReactNode }) {
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [donationStep, setDonationStep] = useState<1 | 2>(1);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donationAmount, setDonationAmount] = useState("25");
  const [donationCampaign, setDonationCampaign] =
    useState("Education Programs");
  const [donationType, setDonationType] = useState<
    "one-time" | "recurring" | "monthly"
  >("one-time");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [donorMessage, setDonorMessage] = useState("");
  const [donationTxnRef, setDonationTxnRef] = useState("");
  const [isDonationProcessing, setIsDonationProcessing] = useState(false);

  const openDonation = useCallback(() => setShowDonationModal(true), []);
  const closeDonation = useCallback(() => {
    setShowDonationModal(false);
    setDonationStep(1);
  }, []);

  // Simulated donation submission (demo only - no real payment)
  const handleDonate = () => {
    // Validate donor name
    if (!donorName.trim() && !isAnonymous) {
      toast.error("Please enter your name");
      return;
    }
    if (donorName.length > 100) {
      toast.error("Name is too long (max 100 characters)");
      return;
    }
    // Validate email format if provided
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (donorEmail && !emailRegex.test(donorEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (donorEmail.length > 254) {
      toast.error("Email is too long");
      return;
    }
    // Validate donation amount (minimum $1, maximum $1,000,000)
    const amount = parseFloat(donationAmount);
    if (!donationAmount || isNaN(amount) || amount < 1) {
      toast.error("Minimum donation is $1.00");
      return;
    }
    if (amount > 1000000) {
      toast.error(
        "Maximum donation amount is $1,000,000. Please contact us for larger gifts."
      );
      return;
    }
    // Validate donor message length
    if (donorMessage.length > 500) {
      toast.error("Message is too long (max 500 characters)");
      return;
    }
    setIsDonationProcessing(true);
    // Simulate processing delay
    setTimeout(() => {
      const txnRef = `GRN-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      setDonationTxnRef(txnRef);
      setDonationStep(2);
      setIsDonationProcessing(false);
      toast.success("Thank you for your donation! (Demo)");
    }, 1500);
  };

  const paymentMethodLabels: Record<
    string,
    { label: string; icon: typeof CreditCard }
  > = {
    card: { label: "Credit / Debit Card", icon: CreditCard },
    paypal: { label: "PayPal", icon: CreditCard },
    crypto_btc: { label: "Bitcoin (BTC)", icon: Bitcoin },
    crypto_eth: { label: "Ethereum (ETH)", icon: Bitcoin },
    crypto_usdt: { label: "USDT (Tether)", icon: Bitcoin },
    bank_transfer: { label: "Bank Transfer", icon: CreditCard },
  };

  return (
    <DonationContext.Provider
      value={{
        showDonationModal,
        openDonation,
        closeDonation,
        donationStep,
        setDonationStep,
        donorName,
        setDonorName,
        donorEmail,
        setDonorEmail,
        donationAmount,
        setDonationAmount,
        donationCampaign,
        setDonationCampaign,
        donationType,
        setDonationType,
        paymentMethod,
        setPaymentMethod,
        isAnonymous,
        setIsAnonymous,
        donorMessage,
        setDonorMessage,
        donationTxnRef,
        isDonationProcessing,
        handleDonate,
        paymentMethodLabels,
      }}
    >
      {children}
      <DonationModal />
    </DonationContext.Provider>
  );
}

export function useDonation() {
  const ctx = useContext(DonationContext);
  if (!ctx) throw new Error("useDonation must be used within DonationProvider");
  return ctx;
}
