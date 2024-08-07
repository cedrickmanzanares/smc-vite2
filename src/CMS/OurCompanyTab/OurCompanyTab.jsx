import { motion } from 'framer-motion';

import { useContext, useEffect, useRef, useState } from 'react';
import { LenisContext } from 'src/App';
import ImageSlider from 'src/CMS/ImageSlider/ImageSlider';
import { createCMSElement } from 'src/helper/cms-helper';

export default function OurCompanyTab({ data }) {
	const [selected, setSelected] = useState(null);
	const lenis = useContext(LenisContext);
	const ref = useRef(null);

	useEffect(() => {
		if (selected === null) return;
		lenis.scrollTo(ref.current.offsetParent.offsetTop);
	}, [selected]);
	return (
		<>
			<div className='column sticky tab-source tabsource-ourcompany'>
				{data.map((item, index) => {
					let trigger = item.trigger;

					return (
						<motion.button
							key={`ourcompany_trigger_${index}`}
							className={`tab-links ${selected === index ? 'active' : ''}`}
							onTap={() => {
								setSelected(index);
							}}>
							<div className='img-container'>
								<img src={trigger.icon_1.src} alt={trigger.icon_1.alt} />
								<img src={trigger.icon_2.src} alt={trigger.icon_2.alt} />
							</div>
							<div className='heading-6 tab-label'>{trigger.label}</div>
						</motion.button>
					);
				})}
			</div>

			<div className='column tab-target tabtarget-ourcompany' ref={ref}>
				{data.map((item, index) => {
					return (
						<motion.div
							key={`ourcompany_target_${index}`}
							style={{ display: selected === index ? 'block' : 'none' }}>
							{item.target.api_childrens.map((child) => {
								if (child.elements_class) {
									if (child.elements_class.includes('slider')) {
										let slides = [];
										child.api_childrens.map((div) => {
											let data = {};
											data.image = div.elements_attributes;
											slides.push(data);
										});

										let sliderClasses = 'has-dots overflow-hidden ';
										sliderClasses += child.elements_class;
										return (
											<ImageSlider
												dots={true}
												widgetClasses={sliderClasses}
												key={`slider_${child.elements_code}`}
												slides={slides}
											/>
										);
									}
								}
								return createCMSElement(child);
							})}

							{/* <ImageSlider
						dots={true}
						type='full'
						captionPosition='absolute'
						arrows={false}
						slides={fnb}
					/> */}
						</motion.div>
					);
				})}
			</div>
		</>
	);
}
