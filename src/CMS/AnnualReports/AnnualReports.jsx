import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import parse from 'html-react-parser';

import { PiCaretCircleLeft, PiCaretCircleRight } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { Select, SelectItem } from 'src/Components/Select/Select';
import { getColors } from 'src/hooks/use-color';

export default function AnnualReports({ slides }) {
	const { blue } = getColors;
	const [index, setIndex] = useState(0);
	const [direction, setDirection] = useState(0);
	const text_variants = {
		initial: {
			x: '50px',
			opacity: 0,
			transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
		},
		enter: {
			x: '0',
			opacity: 1,
			transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
		},
		exit: {
			x: '-100px',
			opacity: 0,
			transition: {
				duration: 0.5,
				ease: [0.76, 0, 0.24, 1],
				opacity: {
					duration: 0.25,
				},
			},
		},
	};

	const getDistance = (index, current) => {
		return Math.abs(current - index);
	};

	const zindex = slides.map((slide, index) => {
		return slides.length - index;
	});

	const z = slides.map((slide, index) => {
		return `-${index * 20}px`;
	});

	const rotate = slides.map((slide, index) => {
		return `${index * 20}deg`;
	});

	const o = slides.map((slide, index) => {
		if (index == 0) return 1;
		if (index > 2) return 0;
		return 1 - index / 3;
	});

	const x = slides.map((slide, index) => {
		if (index == 0) return 1;
		if (index > 2) return 0;
		return 1 - index / 3;
	});

	return (
		<>
			<div className='column full'>
				<div className='disclosure-filter'>
					<span>Select a year for quick search</span>
					<Select
						placeholder='Select year'
						// value={selected}
						onValueChange={(event, index) => {
							window.open(event, '_blank');
						}}>
						<SelectItem value=' '>Select a year</SelectItem>
						{slides &&
							slides.map((c) => {
								console.log(c);
								return (
									<SelectItem
										key={`annual_report_${c.subtitle}`}
										value={c.link}>
										{c.subtitle}
									</SelectItem>
								);
							})}
					</Select>
				</div>
			</div>
			<div className='column annual-desc'>
				<AnimatePresence mode='popLayout'>
					<motion.div
						key={`slider_desc-${index}`}
						initial='initial'
						exit='exit'
						animate='enter'
						transition={{
							staggerChildren: 0.0025,
						}}
						className='desc-container'>
						<motion.h5 variants={text_variants} className='heading-5 year'>
							{slides[index].subtitle}
						</motion.h5>
						<motion.h3
							variants={text_variants}
							className='annual-title heading-2'>
							{slides[index].title}
						</motion.h3>
						{slides[index].desc && (
							<motion.div variants={text_variants}>
								{parse(slides[index].desc)}
								<motion.p variants={text_variants}>
									<Link
										to={slides[index].link}
										target='_blank'
										className={'btn btn-bordered pri-btn'}>
										Learn more
									</Link>
								</motion.p>
							</motion.div>
						)}
					</motion.div>
				</AnimatePresence>
			</div>

			<div className='column annual-image'>
				<div className='slider'>
					{slides.map((slide, i) => {
						return (
							<motion.div
								key={`slide_annual-image${i}`}
								className='slide'
								transition={{
									duration: 0.5,
									ease: [0.76, 0, 0.24, 1],
									zIndex: {
										delay: 0 > direction ? 0.15 : 0.25,
									},
								}}
								style={{
									pointerEvents: index === i ? 'all' : 'none',
								}}
								animate={{
									opacity: i < index ? 0 : o[getDistance(i, index)],
									zIndex: zindex[getDistance(i, index)],
									z: i < index ? '0' : z[getDistance(i, index)],
									x: `${(index - i) * 70 - index * 100}%`,
								}}>
								{slide.img && (
									<Link to={slides[index].link} target='_blank'>
										<img src={slide.img.src} alt={slide.img.alt} />
									</Link>
								)}
							</motion.div>
						);
					})}
				</div>
				<div className='controls'>
					<motion.button
						className='button left'
						style={{
							pointerEvents: index === 0 ? 'none' : 'all',
						}}
						animate={{
							opacity: index === 0 ? 0 : 1,
						}}
						onTap={() => {
							setIndex((prev) => prev - 1);
							setDirection(-1);
						}}>
						<PiCaretCircleLeft size={'2.5rem'} color={blue} />
					</motion.button>
					<motion.button
						className='button right'
						style={{
							pointerEvents: index === slides.length - 1 ? 'none' : 'all',
						}}
						animate={{
							opacity: index === slides.length - 1 ? 0 : 1,
						}}
						onTap={() => {
							setIndex((prev) => prev + 1);
							setDirection(1);
						}}>
						<PiCaretCircleRight size={'2.5rem'} color={blue} />
					</motion.button>
				</div>
			</div>
		</>
	);
}
