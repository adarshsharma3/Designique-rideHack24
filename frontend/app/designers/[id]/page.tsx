import React from "react";

type Props = {
	params: { id: string };
};

export async function generateStaticParams() {
	// Replace with your actual designer IDs
	return [
		{ id: "1" },
		{ id: "2" },
		{ id: "3" },
		{ id: "4" },
		{ id: "5" },
		{ id: "6" },
		{ id: "7" },
		{ id: "8" },
		{ id: "9" },
		{ id: "10" },
		{ id: "11" },
		{ id: "12" },
		{ id: "13" },
	];
}

function DesignerPage({ params }: Props) {
	return (
		<main className="min-h-screen bg-gray-900">
			<div className="relative h-80 w-full">
				<img
					src="/placeholder-cover.jpg"
					alt="Designer Cover"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
			</div>

			<div className="max-w-4xl mx-auto px-6 -mt-16 relative z-10">
				<div className="space-y-8 p-8 rounded-xl bg-gray-800/30 backdrop-blur-lg border border-gray-700/30 shadow-2xl">
					<div className="flex items-end justify-between flex-wrap gap-4">
						<h1 className="text-4xl font-bold text-white">Designer Name</h1>
						<div className="flex gap-3">
							<button className="px-6 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition backdrop-blur-sm">
								Follow
							</button>
							<button className="px-6 py-2 border border-white/30 text-white rounded-full hover:bg-white/10 transition backdrop-blur-sm">
								Chat
							</button>
						</div>
					</div>

					<div className="grid grid-cols-3 gap-8">
						<div className="text-center p-4 rounded-lg border border-gray-700/30 bg-gray-800/30 backdrop-blur-sm">
							<div className="text-2xl font-bold text-white">245</div>
							<div className="text-gray-300">Projects</div>
						</div>
						<div className="text-center p-4 rounded-lg border border-gray-700/30 bg-gray-800/30 backdrop-blur-sm">
							<div className="text-2xl font-bold text-white">15.4K</div>
							<div className="text-gray-300">Followers</div>
						</div>
						<div className="text-center p-4 rounded-lg border border-gray-700/30 bg-gray-800/30 backdrop-blur-sm">
							<div className="text-2xl font-bold text-white">4.9</div>
							<div className="text-gray-300">Rating</div>
						</div>
					</div>

					<div className="space-y-6">
						<div className="p-4 rounded-lg border border-gray-700/30 bg-gray-800/30 backdrop-blur-sm">
							<h2 className="text-xl font-semibold text-white mb-2">
								Specialization
							</h2>
							<p className="text-gray-300">UX/UI Design, Brand Identity</p>
						</div>
						<div className="p-4 rounded-lg border border-gray-700/30 bg-gray-800/30 backdrop-blur-sm">
							<h2 className="text-xl font-semibold text-white mb-2">Bio</h2>
							<p className="text-gray-300">
								A passionate designer with over 8 years of experience in
								creating beautiful and functional digital experiences.
							</p>
						</div>
						<div className="flex gap-3">
							<button className="flex-1 px-6 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition backdrop-blur-sm">
								View Portfolio
							</button>
							<button className="flex-1 px-6 py-3 border border-white/30 text-white rounded-full hover:bg-white/10 transition backdrop-blur-sm">
								Social Profiles
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

export default DesignerPage;
