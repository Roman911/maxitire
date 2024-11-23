import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Language } from '../../models/language';

export interface LangState {
	lang: Language
}

const initialState: LangState = {
	lang: Language.UA,
}

export const langSlice = createSlice({
	name: 'lang',
	initialState,
	reducers: {
		changedLang: (state, actions: PayloadAction<Language>) => {
			state.lang = actions.payload
		},
	},
})

export const { changedLang } = langSlice.actions

export default langSlice.reducer