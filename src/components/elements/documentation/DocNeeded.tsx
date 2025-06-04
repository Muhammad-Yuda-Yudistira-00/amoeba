import type { JSX } from 'react';

export default function DocNeeded(): JSX.Element {
	return(
		<section className="uppercase px-2 pb-6">
			<h1 className="text-xl">Who need this?</h1>
			<div className="">
				<ul>
					<li>for working (company, business)</li>
					<li>for study (student)</li>
					<li>for life (general)</li>
				</ul>
			</div>
		</section>
	)
}