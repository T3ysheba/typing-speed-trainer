2
import type { RootState } from 'types'

const getText = (state: RootState) => state.global.data

export const GlobalSelectors = {
  getText,
}
