import { redirect } from "next/navigation";

type Props = { params: Promise<{ symbol: string }> };

/** Marketing-site fallback when the native app is not installed. */
export default async function InstrumentWebFallback({ params }: Props) {
  const { symbol } = await params;
  const store = process.env.NEXT_PUBLIC_APP_STORE_URL?.trim();
  if (store) {
    redirect(store);
  }
  redirect(`/?ref=instrument-${encodeURIComponent(symbol)}`);
}
