"use client";

import { MapPin } from "lucide-react";
import { Designer } from "@/lib/types";
import Image from "next/image";

interface DesignerProfileProps {
	designer: Designer;
}

export function DesignerProfile({ designer }: DesignerProfileProps) {
	return (
		<div className="flex items-center mt-20 relative z-10">
			<Image
				src={designer.avatar}
				alt={designer.name}
				width={96}
				height={96}
				className="rounded-full border-4 border-purple-400"
			/>
			<div className="ml-6">
				<h2 className="text-2xl font-bold">{designer.name}</h2>
				<p className="text-gray-400 flex items-center mt-1">
					<MapPin className="h-4 w-4 mr-1" />
					{designer.location}
				</p>
			</div>
		</div>
	);
}
