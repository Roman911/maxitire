import { useState } from 'react';

import { Filter } from '../Filter';
import { AdditionalFilterComponent } from '../../../components/Home';
import { Section } from '../../../models/filter';

export const AdditionalFilter = () => {
	const [sectionTires, setSectionTires] = useState<Section>(Section.Tires);
	const [sectionDisks, setSectionDisks] = useState<Section>(Section.Disks);

	const onChangeFilter = (name: 'tires' | 'disks', section: Section) => {
		if(name === 'tires') {
			setSectionTires(section);
		} else if (name === 'disks') {
			setSectionDisks(section);
		}
	}

	return <div className='grid grid-cols-1 md:grid-cols-2 mt-10'>
		<AdditionalFilterComponent additionalFilter='tires' section={ sectionTires } onChangeFilter={ onChangeFilter }>
			<Filter additionalFilter='tires' additionalSection={ sectionTires } />
		</AdditionalFilterComponent>
		<AdditionalFilterComponent additionalFilter='disks' section={ sectionDisks } onChangeFilter={ onChangeFilter }>
			<Filter additionalFilter='disks' additionalSection={ sectionDisks } />
		</AdditionalFilterComponent>
	</div>
};
