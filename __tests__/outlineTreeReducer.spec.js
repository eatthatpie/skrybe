import actionTypes from '@/actions/types';
import reducer from '@/reducers/outlineTreeReducer'

describe(`Outline tree reducer`, () => {
    it(`is testable`, () => {
        expect(1).toBeTruthy();
    });

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            lastId: 7,
            items: {
                root: {
                    leadText: 'Write down the one line description of your story.',
                    bodyText: '',
                    parentNodeId: null,
                    descendants: ['1'],
                    siblings: []
                },
                '1': {
                    leadText: '',
                    bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac ligula nec purus bibendum consequat.',
                    parentNodeId: 'root',
                    descendants: ['2', '3'],
                    siblings: []
                },
                '2': {
                    leadText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    bodyText: 'Donec congue eget arcu quis molestie. Integer nec orci in orci faucibus suscipit eu sit amet lectus.',
                    parentNodeId: '1',
                    descendants: ['4', '5'],
                    siblings: ['3']
                },
                '3': {
                    leadText: 'Curabitur ac ligula nec purus bibendum consequat.',
                    bodyText: 'Sed sagittis, lacus ac lobortis congue, justo massa sodales tortor, et efficitur urna elit a elit. Mauris at risus malesuada, molestie purus et, imperdiet risus.',
                    parentNodeId: '1',
                    descendants: ['6', '7'],
                    siblings: ['2']
                },
                '4': {
                    leadText: 'Donec congue eget arcu quis molestie.',
                    bodyText: '',
                    parentNodeId: '2',
                    descendants: [],
                    siblings: ['5']
                },
                '5': {
                    leadText: 'Integer nec orci in orci faucibus suscipit eu sit amet lectus.',
                    bodyText: '',
                    parentNodeId: '2',
                    descendants: [],
                    siblings: ['4']
                },
                '6': {
                    leadText: 'Sed sagittis, lacus ac lobortis congue, justo massa sodales tortor, et efficitur urna elit a elit.',
                    bodyText: '',
                    parentNodeId: '3',
                    descendants: [],
                    siblings: ['7']
                },
                '7': {
                    leadText: 'Mauris at risus malesuada, molestie purus et, imperdiet risus.',
                    bodyText: '',
                    parentNodeId: '3',
                    descendants: [],
                    siblings: ['6']
                }
            }
        })
    });

    describe(`on action SET_OUTLINE_TREE_NODE`, () => {
        it(`should throw error if both nodeId and parentNodeId are provided`, () => {
            expect(() => {
                return reducer(
                    {
                        lastId: 1,
                        items: {
                            root: {
                                leadText: 'Write down the one line description of your story.',
                                bodyText: '',
                                parentNodeId: null,
                                descendants: ['1'],
                                siblings: []
                            },
                            '1': {
                                leadText: 'Lorem ipsum dolor sit amet',
                                bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac ligula nec purus bibendum consequat.',
                                parentNodeId: 'root',
                                descendants: [],
                                siblings: []
                            }
                        }
                    },
                    {
                        type: actionTypes.SET_OUTLINE_TREE_NODE,
                        nodeId: '3',
                        parentNodeId: '1',
                        leadText: 'Changed lead text'
                    }
                )
            })
            .toThrow();
        });

        it(`should throw error if node with given id does not exist`, () => {
            expect(() => {
                return reducer(
                    {
                        lastId: 1,
                        items: {
                            root: {
                                leadText: 'Write down the one line description of your story.',
                                bodyText: '',
                                parentNodeId: null,
                                descendants: ['1'],
                                siblings: []
                            },
                            '1': {
                                leadText: 'Lorem ipsum dolor sit amet',
                                bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac ligula nec purus bibendum consequat.',
                                parentNodeId: 'root',
                                descendants: [],
                                siblings: []
                            }
                        }
                    },
                    {
                        type: actionTypes.SET_OUTLINE_TREE_NODE,
                        nodeId: '3',
                        leadText: 'Changed lead text'
                    }
                )
            })
            .toThrow();
        });

        it(`should update leadText and/or bodyText if nodeId is provided`, () => {
            expect(
                reducer(
                    {
                        lastId: 1,
                        items: {
                            root: {
                                leadText: 'Write down the one line description of your story.',
                                bodyText: '',
                                parentNodeId: null,
                                descendants: ['1'],
                                siblings: []
                            },
                            '1': {
                                leadText: 'Lorem ipsum dolor sit amet',
                                bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac ligula nec purus bibendum consequat.',
                                parentNodeId: 'root',
                                descendants: [],
                                siblings: []
                            }
                        }
                    },
                    {
                        type: actionTypes.SET_OUTLINE_TREE_NODE,
                        nodeId: '1',
                        leadText: 'Changed lead text'
                    }
                )
            )
            .toEqual({
                lastId: 1,
                items: {
                    root: {
                        leadText: 'Write down the one line description of your story.',
                        bodyText: '',
                        parentNodeId: null,
                        descendants: ['1'],
                        siblings: []
                    },
                    '1': {
                        leadText: 'Changed lead text',
                        bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac ligula nec purus bibendum consequat.',
                        parentNodeId: 'root',
                        descendants: [],
                        siblings: []
                    }
                }
            });
        });

        it(`should create new node if parentNode is provided`, () => {
            expect(
                reducer(
                    {
                        lastId: 1,
                        items: {
                            root: {
                                leadText: 'Write down the one line description of your story.',
                                bodyText: '',
                                parentNodeId: null,
                                descendants: ['1'],
                                siblings: []
                            },
                            '1': {
                                leadText: 'Lorem ipsum dolor sit amet',
                                bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac ligula nec purus bibendum consequat.',
                                parentNodeId: 'root',
                                descendants: [],
                                siblings: []
                            }
                        }
                    },
                    {
                        type: actionTypes.SET_OUTLINE_TREE_NODE,
                        parentNodeId: '1',
                        leadText: 'Lead text',
                        bodyText: 'Body text'
                    }
                )
            )
            .toEqual({
                lastId: 2,
                items: {
                    root: {
                        leadText: 'Write down the one line description of your story.',
                        bodyText: '',
                        parentNodeId: null,
                        descendants: ['1'],
                        siblings: []
                    },
                    '1': {
                        leadText: 'Lorem ipsum dolor sit amet',
                        bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac ligula nec purus bibendum consequat.',
                        parentNodeId: 'root',
                        descendants: ['2'],
                        siblings: []
                    },
                    '2': {
                        leadText: 'Lead text',
                        bodyText: 'Body text',
                        parentNodeId: '1',
                        descendants: [],
                        siblings: []
                    }
                }
            });

            expect(
                reducer(
                    {
                        lastId: 2,
                        items: {
                            root: {
                                leadText: 'Write down the one line description of your story.',
                                bodyText: '',
                                parentNodeId: null,
                                descendants: ['1'],
                                siblings: []
                            },
                            '1': {
                                leadText: 'Lorem ipsum dolor sit amet',
                                bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac ligula nec purus bibendum consequat.',
                                parentNodeId: 'root',
                                descendants: ['2'],
                                siblings: []
                            },
                            '2': {
                                leadText: 'Lead text',
                                bodyText: 'Body text',
                                parentNodeId: '1',
                                descendants: [],
                                siblings: []
                            }
                        }
                    },
                    {
                        type: actionTypes.SET_OUTLINE_TREE_NODE,
                        parentNodeId: '1',
                        leadText: 'Descendant lead text',
                        bodyText: 'Descendant body text'
                    }
                )
            )
            .toEqual({
                lastId: 3,
                items: {
                    root: {
                        leadText: 'Write down the one line description of your story.',
                        bodyText: '',
                        parentNodeId: null,
                        descendants: ['1'],
                        siblings: []
                    },
                    '1': {
                        leadText: 'Lorem ipsum dolor sit amet',
                        bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac ligula nec purus bibendum consequat.',
                        parentNodeId: 'root',
                        descendants: ['2', '3'],
                        siblings: []
                    },
                    '2': {
                        leadText: 'Lead text',
                        bodyText: 'Body text',
                        parentNodeId: '1',
                        descendants: [],
                        siblings: ['3']
                    },
                    '3': {
                        leadText: 'Descendant lead text',
                        bodyText: 'Descendant body text',
                        parentNodeId: '1',
                        descendants: [],
                        siblings: ['2']
                    }
                }
            });
        });
    });

    describe(`on action GENERATE_DESCENDANTS_OF_NODE`, () => {
        it(`should generate descendants by parent sentences`, () => {
            expect(
                reducer({
                    lastId: 1,
                    items: {
                        root: {
                            leadText: 'Write down the one line description of your story.',
                            bodyText: '',
                            parentNodeId: null,
                            descendants: ['1'],
                            siblings: []
                        },
                        '1': {
                            leadText: '',
                            bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac ligula nec purus bibendum consequat.',
                            parentNodeId: 'root',
                            descendants: [],
                            siblings: []
                        }
                    }
                },
                {
                    type: actionTypes.GENERATE_DESCENDANTS_OF_NODE,
                    nodeId: '1'
                })
            )
            .toEqual({
                lastId: 3,
                items: {
                    root: {
                        leadText: 'Write down the one line description of your story.',
                        bodyText: '',
                        parentNodeId: null,
                        descendants: ['1'],
                        siblings: []
                    },
                    '1': {
                        leadText: '',
                        bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac ligula nec purus bibendum consequat.',
                        parentNodeId: 'root',
                        descendants: ['2', '3'],
                        siblings: []
                    },
                    '2': {
                        leadText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        bodyText: '',
                        parentNodeId: '1',
                        descendants: [],
                        siblings: ['3']
                    },
                    '3': {
                        leadText: 'Curabitur ac ligula nec purus bibendum consequat.',
                        bodyText: '',
                        parentNodeId: '1',
                        descendants: [],
                        siblings: ['2']
                    }
                }
            });
        });

        it(`should generate descendants only if there are none`, () => {
            expect(
                reducer({
                    lastId: 2,
                    items: {
                        root: {
                            leadText: 'Write down the one line description of your story.',
                            bodyText: '',
                            parentNodeId: null,
                            descendants: ['1'],
                            siblings: []
                        },
                        '1': {
                            leadText: '',
                            bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac ligula nec purus bibendum consequat.',
                            parentNodeId: 'root',
                            descendants: ['2'],
                            siblings: []
                        },
                        '2': {
                            leadText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                            bodyText: '',
                            parentNodeId: '1',
                            descendants: [],
                            siblings: []
                        }
                    }
                },
                {
                    type: actionTypes.GENERATE_DESCENDANTS_OF_NODE,
                    nodeId: '1'
                })
            )
            .toEqual({
                lastId: 2,
                items: {
                    root: {
                        leadText: 'Write down the one line description of your story.',
                        bodyText: '',
                        parentNodeId: null,
                        descendants: ['1'],
                        siblings: []
                    },
                    '1': {
                        leadText: '',
                        bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac ligula nec purus bibendum consequat.',
                        parentNodeId: 'root',
                        descendants: ['2'],
                        siblings: []
                    },
                    '2': {
                        leadText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        bodyText: '',
                        parentNodeId: '1',
                        descendants: [],
                        siblings: []
                    }
                }
            });
        });
    });
});