
export default {

  namespace: 'example',

  state: {
    tags: ['Tag 1', 'Tag 2']
  },

  subscriptions: {
  },

  effects: {
    *removeMutiTags({ payload }, { put, select }) {  // eslint-disable-line
      const example = yield select(state => state.example);
      const { tags } = example;
      const { tags:checkedTags } = payload;
      const filterTags = tags.filter(item => {
        return  !checkedTags.includes(item);
      });
      yield put({ type: 'save', payload:{ tags : filterTags }})
    },
    *addNewTag({ payload }, { put, select }) {  // eslint-disable-line
      const example = yield select(state => state.example);
      const { tags } = example;
      const { tag } = payload;
      let newTags = tags;
      if (tag && tags.indexOf(tag) === -1) {
        newTags = [...tags, tag];
      }
      yield put({ type: 'save', payload:{ tags: newTags }})
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
