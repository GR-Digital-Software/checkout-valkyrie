import Marquee from 'react-fast-marquee';
import Testimonial from '../Testimonial';

export default function CarruselTestimonial() {
    return (
        <div className="w-full h-fit">
            <Marquee speed={50} gradient={false}>
                <div className="flex space-x-4 mx-2">
                    <Testimonial />
                    <Testimonial />
                    <Testimonial />
                    <Testimonial />
                </div>
            </Marquee>
        </div>
    );
}
