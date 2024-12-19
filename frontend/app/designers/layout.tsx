import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Designer Portal - Connect with Fashion Designers",
	description:
		"Connect with India's top fashion designers, showcase designs, and collaborate on creative projects.",
};

export default function DesignerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="designers-layout">
			{/* Designer-specific layout elements can go here */}
			<main className="min-h-screen">{children}</main>
		</div>
	);
}
