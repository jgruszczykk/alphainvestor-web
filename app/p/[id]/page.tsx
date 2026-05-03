import { redirect } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default async function PortfolioWebFallback({ params }: Props) {
  const { id } = await params;
  const store = process.env.NEXT_PUBLIC_APP_STORE_URL?.trim();
  if (store) {
    redirect(store);
  }
  redirect(`/?ref=portfolio-${encodeURIComponent(id)}`);
}
