"use client";
import React, {
	useEffect,
	useRef,
	useState,
	createContext,
	useContext,
} from "react";
import {
	IconArrowNarrowLeft,
	IconArrowNarrowRight,
	IconX,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import { LuExternalLink } from "react-icons/lu";

interface CarouselProps {
	items: JSX.Element[];
	initialScroll?: number;
}

type Card = {
	link: Url;
	src: string;
	title: string;
	category: string;
	content: React.ReactNode;
};

export const CarouselContext = createContext<{
	onCardClose: (index: number) => void;
	currentIndex: number;
}>({
	onCardClose: () => {},
	currentIndex: 0,
});

export const Carousell = ({ items, initialScroll = 0 }: CarouselProps) => {
	const carouselRef = React.useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = React.useState(false);
	const [canScrollRight, setCanScrollRight] = React.useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (carouselRef.current) {
			carouselRef.current.scrollLeft = initialScroll;
			checkScrollability();
		}
	}, [initialScroll]);

	const checkScrollability = () => {
		if (carouselRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
			setCanScrollLeft(scrollLeft > 0);
			setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
		}
	};

	const scrollLeft = () => {
		if (carouselRef.current) {
			carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
		}
	};

	const scrollRight = () => {
		if (carouselRef.current) {
			carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
		}
	};

	const handleCardClose = (index: number) => {
		if (carouselRef.current) {
			const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
			const gap = isMobile() ? 4 : 8;
			const scrollPosition = (cardWidth + gap) * (index + 1);
			carouselRef.current.scrollTo({
				left: scrollPosition,
				behavior: "smooth",
			});
			setCurrentIndex(index);
		}
	};

	const isMobile = () => {
		return window && window.innerWidth < 768;
	};

	return (
		<CarouselContext.Provider
			value={{ onCardClose: handleCardClose, currentIndex }}
		>
			<div className="relative w-full">
				<div
					className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none]"
					ref={carouselRef}
					onScroll={checkScrollability}
				>
					<div
						className={cn(
							"absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l from-white/10 to-transparent backdrop-blur-sm"
						)}
					></div>

					<div
						className={cn(
							"flex flex-row justify-start gap-4 pl-4",
							"max-w-7xl mx-auto"
						)}
					>
						{items.map((item, index) => (
							<motion.div
								initial={{
									opacity: 0,
									y: 20,
								}}
								animate={{
									opacity: 1,
									y: 0,
									transition: {
										duration: 0.5,
										delay: 0.2 * index,
										ease: "easeOut",
										once: true,
									},
								}}
								key={"card" + index}
								className="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
							>
								{item}
							</motion.div>
						))}
					</div>
				</div>
				<div className="flex justify-end gap-2 mr-10">
					<button
						className="relative z-40 h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center disabled:opacity-50 hover:bg-white/20 transition-all"
						onClick={scrollLeft}
						disabled={!canScrollLeft}
					>
						<IconArrowNarrowLeft className="h-6 w-6 text-white" />
					</button>
					<button
						className="relative z-40 h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center disabled:opacity-50 hover:bg-white/20 transition-all"
						onClick={scrollRight}
						disabled={!canScrollRight}
					>
						<IconArrowNarrowRight className="h-6 w-6 text-white" />
					</button>
				</div>
			</div>
		</CarouselContext.Provider>
	);
};

export const Card = ({
	card,
	index,
	layout = false,
}: {
	card: Card;
	index: number;
	layout?: boolean;
}) => {
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const { onCardClose } = useContext(CarouselContext);

	useEffect(() => {
		function onKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				handleClose();
			}
		}

		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [open]);

	useOutsideClick(containerRef, () => handleClose());

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		onCardClose(index);
	};

	return (
		<>
			<AnimatePresence>
				{open && (
					<div className="fixed inset-0 h-screen z-50 overflow-auto">
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="bg-black/60 backdrop-blur-xl h-full w-full fixed inset-0"
						/>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							ref={containerRef}
							layoutId={layout ? `card-${card.title}` : undefined}
							className="max-w-5xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 h-fit z-[60] my-10 p-4 md:p-10 rounded-3xl font-sans relative"
						>
							<button
								className="sticky top-4 h-8 w-8 right-0 ml-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
								onClick={handleClose}
							>
								<IconX className="h-6 w-6 text-white" />
							</button>
							<motion.p
								layoutId={layout ? `category-${card.title}` : undefined}
								className="text-base font-medium text-white/90"
							>
								{card.category}
							</motion.p>
							<motion.p
								layoutId={layout ? `title-${card.title}` : undefined}
								className="text-2xl md:text-5xl font-semibold mt-4 text-white"
							>
								{card.title}{" "}
							</motion.p>
							<motion.p
								layoutId={layout ? `title-${card.title}` : undefined}
								className="absolute top-10 right-20"
							>
								<Link
									href={card.link}
									className="pt-3 text-[2rem] cursor-pointer text-purple-300"
								>
									<LuExternalLink />
								</Link>
							</motion.p>
							<div className="py-10">{card.content}</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
			<motion.button
				layoutId={layout ? `card-${card.title}` : undefined}
				onClick={handleOpen}
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				whileHover={{ scale: 1.03 }}
				transition={{ duration: 0.3 }}
				className="rounded-3xl h-full bg-white/10 backdrop-blur-md border border-white/20 w-56 md:h-[29rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10 hover:bg-white/20 transition-all"
			>
				<div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
				<div className="relative z-40 p-8">
					<motion.p
						layoutId={layout ? `category-${card.category}` : undefined}
						className="text-white/90 text-sm md:text-base font-medium font-sans text-left"
					>
						{card.category}
					</motion.p>
					<motion.p
						layoutId={layout ? `title-${card.title}` : undefined}
						className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2"
					>
						{card.title}
					</motion.p>
				</div>
				<BlurImage
					src={card.src}
					alt={card.title}
					fill
					className="object-cover absolute z-10 inset-0"
				/>
			</motion.button>
		</>
	);
};

export const BlurImage = ({
	height,
	width,
	src,
	className,
	alt,
	...rest
}: ImageProps) => {
	const [isLoading, setLoading] = useState(true);
	return (
		<Image
			className={cn(
				"transition duration-300",
				isLoading ? "blur-sm" : "blur-0",
				className
			)}
			onLoad={() => setLoading(false)}
			src={src}
			width={width}
			height={height}
			loading="lazy"
			decoding="async"
			blurDataURL={typeof src === "string" ? src : undefined}
			alt={alt ? alt : "Background of a beautiful view"}
			{...rest}
		/>
	);
};
