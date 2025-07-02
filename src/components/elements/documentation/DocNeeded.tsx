import type { JSX } from 'react';

export default function DocNeeded(): JSX.Element {
	return(
		<section className="uppercase px-2 pb-6">
			<h1 className="text-xl pb-2">Who need this?</h1>
			<div>
				<ul className="divide-y-2 divide-green-400">
					<li>for working (company, business)</li>
					<li>for study (student)</li>
					<li>for life (general)</li>
				</ul>
			</div>
		</section>
	)
}