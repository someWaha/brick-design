import { reducer } from '../../reducers'
import ACTION_TYPES from '../../actions/actionTypes'
import { legoState } from '../../store'
import { ComponentConfigsType, SelectedInfoType, StateType } from '../../types';

describe('changeStyle', () => {
	test('selectedInfo=null', () => {
		const state = reducer(legoState, {
			type: ACTION_TYPES.changeStyles,
			payload: { style: {} },
		})
		expect(state).toBe(legoState)
	})
	test('selectedInfo!=null', () => {
		const prevState: StateType = {
			...legoState,
			selectedInfo: {
				selectedKey: 'root',
				domTreeKeys: ['root'],
				propName: 'children',
				parentKey: '',
				propsConfig:{}
			},
			componentConfigs: {
				root: {
					componentName: 'span',
					props: {},
					childNodes: {
						children: [],
						test: [],
					},
				},
			},
		}
		const state = reducer(prevState, {
			type: ACTION_TYPES.changeStyles,
			payload: { style: {} },
		})
		expect(state.componentConfigs.root.props).toEqual({ style: {} })
	})
})
describe('resetStyle',()=>{
	it('selectedInfo===null',()=>{
		expect(reducer(legoState,{type:ACTION_TYPES.resetStyles})).toBe(legoState)
	})

	it('重置样式 props===undefined',()=>{
		const selectedInfo:SelectedInfoType={
			selectedKey:"root",
			propsConfig:{},
			domTreeKeys:[],
			parentKey:''
		}
		const componentConfigs:ComponentConfigsType={
			root:{componentName:'a',props:{style:{a:1}}}
		}
		const prevState:StateType={
			...legoState,
			undo:[],
			selectedInfo,
			componentConfigs

		}
		const state=reducer(prevState,{type:ACTION_TYPES.resetStyles})
		const expectState:StateType={
			...prevState,
			undo:[{componentConfigs}],
			componentConfigs:{
				root:{
					componentName:'a',
					props:{}
				}
			}
		}
		expect(state).toEqual(expectState)
	})
	it('重置样式 prop!==undefined',()=>{
		const selectedInfo:SelectedInfoType={
			selectedKey:"root",
			propsConfig:{},
			domTreeKeys:[],
			props:{},
			parentKey:''
		}
		const componentConfigs:ComponentConfigsType={
			root:{componentName:'a',props:{style:{a:1}}}
		}
		const prevState:StateType={
			...legoState,
			undo:[],
			selectedInfo,
			componentConfigs

		}
		const state=reducer(prevState,{type:ACTION_TYPES.resetStyles})
		const expectState:StateType={
			...prevState,
			undo:[{componentConfigs}],
			componentConfigs:{
				root:{
					componentName:'a',
					props:{}
				}
			}
		}
		expect(state).toEqual(expectState)
	})
})
