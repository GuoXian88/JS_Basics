import React from 'react'
import { List, Map } from 'immutable'
import { FILTER_CLASS_GRADE_TYPE } from '../../../../constants/list/enums/filter'
import { CF_RECOMMEND_YS_TIPS } from '../../../../constants/list/enums/recommend'
import store from '../../../../stores/list/index'
import NoResultTip from '../../../../components/list/result/recommend/noResultTip'
import GroupTitle from '../../../../components/list/result/recommend/groupTitle'
import ShowMore from '../../../../components/list/result/recommend/showMore'
import CFRecYSUbt from '../../../../ubt/CFRecommendYS'

//推荐提示语
const RECOMMEND_TIPS = CF_RECOMMEND_YS_TIPS.toJSON()
//两舱推荐 TODO: refactoring
class CFRecommendYSUtil {
    constructor(...props) {
        this.isSearchFC = false
        this.isSearchF = false
        this.isSearchC = false
        this.isNotCFRecommendYS = false

        this.isSortedByDirectFirst = false
        this.searchType = ''

        this.sortCategory = ''
        this.qualifyCategory = ''

        //初始化
        this.init(...props)
    }

    init(flights, activeClassGrade, isSortedByDirectFirst, isRoundTripCombination, selectAppendShowMore, prevCond) {
        this.prevCond = prevCond
        this.setSearchCabinClass()
        this.flights = flights
        this.isFilterFC = activeClassGrade.includes('F_C')
        this.isFilterF = activeClassGrade.includes('F')
        this.isFilterC = activeClassGrade.includes('C')
        this.isSortedByDirectFirst = isSortedByDirectFirst
        this.isRoundTripCombination = isRoundTripCombination
        this.selectAppendShowMore = selectAppendShowMore
        this.getSortCategory(isSortedByDirectFirst, this.isFilterFC, this.isFilterF, this.isFilterC, activeClassGrade.includes('Y'), activeClassGrade.includes('S'))
    }

    //是否查询FC
    setSearchCabinClass() {
        let cabin = this.prevCond && this.prevCond.get('cabin')
        switch (cabin) {
            case 'C_F':
                this.isSearchFC = true
                break
            case 'C':
                this.isSearchC = true
                break
            case 'F':
                this.isSearchF = true
                break
            default:
                this.isNotCFRecommendYS = true
        }
    }

    //获取两舱逻辑排序类别
    getSortCategory(isSortedByDirectFirst, isFilterFC, isFilterF, isFilterC, isFilterY, isFilterS) {
        let isNotFilterForC = !(isFilterFC || isFilterF || isFilterC),
            isSearchForC = this.isSearchFC || this.isSearchF || this.isSearchC

        //查询/筛选舱等
        if (isFilterFC || (isNotFilterForC && this.isSearchFC)) {
            this.searchType = 'SEARCH_FC'
            this.isSearchOrFilterFC = true
        } else if (isFilterF || (isNotFilterForC && this.isSearchF)) {
            this.searchType = 'SEARCH_F'
            this.isSearchOrFilterF = true
        } else if (isFilterC || (isNotFilterForC && this.isSearchC)) {
            this.searchType = 'SEARCH_C'
            this.isSearchOrFilterC = true
        }

        //筛选YS
        if (isSearchForC) {
            if (isFilterY)
                this.searchType = 'SEARCH_Y'
            if (isFilterS)
                this.searchType = 'SEARCH_S'
        }

        //是否直飞优先
        if (isSortedByDirectFirst) {
            this.isSortedByDirectFirst = true
        } else {
            this.isSortedByDirectFirst = false
        }
    }

    getResultCategory(groupedFlights) {
        let {
            cfDirect,
            fDirect,
            cDirect,
            ysDirect,
            yDirect,
            sDirect,
            cfTransfer,
            cTransfer,
            fTransfer
        } = groupedFlights

        switch (this.searchType) {
            case 'SEARCH_FC':
                if (cfDirect.size > 0) {
                    return this.searchType + '|HAS_DIRECT'
                }
                else if (cfDirect.size == 0 && cfTransfer.size > 0) {
                    return this.searchType + '|NODIRECT_HAS_TRANSFER'
                }
                else if (cfDirect.size == 0 && cfTransfer.size == 0) {
                    return this.searchType + '|NORESULT'
                }
            case 'SEARCH_F':
                if (fDirect.size > 0) {
                    return this.searchType + '|HAS_DIRECT'
                }
                else if (fDirect.size == 0 && fTransfer.size > 0) {
                    return this.searchType + '|NODIRECT_HAS_TRANSFER'
                }
                else if (fDirect.size == 0 && fTransfer.size == 0) {
                    return this.searchType + '|NORESULT'
                }
            case 'SEARCH_C':
                if (cDirect.size > 0) {
                    return this.searchType + '|HAS_DIRECT'
                }
                else if (cDirect.size == 0 && cTransfer.size > 0) {
                    return this.searchType + '|NODIRECT_HAS_TRANSFER'
                }
                else if (cDirect.size == 0 && cTransfer.size == 0) {
                    return this.searchType + '|NORESULT'
                }
            case 'SEARCH_Y':
            case 'SEARCH_S':
                if ((yDirect.size === 0 && sDirect.size > 0) || (sDirect.size === 0 && sDirect.size > 0))
                    return this.searchType + '|NORESULT'
                return ''
            default:
                return ''
        }
    }

    setRecommendFieldValue(group, value) {
        if (group.size)
            return group.setIn([0, 'recommendGroup'], Map(value))
        return group
    }


    insertRecommendedFlights(orig, recommended, recommendClassGradeTip) {
        //小于等于12条推荐航班置底
        if (orig.size <= RECOMMEND_TIPS.RECOMMEND_MIN_GATE.value) {
            return orig.concat(recommended.updateIn([0, 'recommendGroup', 'isFold'], item => item = false))
        } else {
            if (recommended.size) {
                return orig.slice(0, RECOMMEND_TIPS.RECOMMEND_AFTER_GATE.value).concat(this.addFoldFlag(recommended, RECOMMEND_TIPS.YS_FOLD_GATE.value, recommendClassGradeTip)).concat(this.setRecommendFieldValue(orig.slice(RECOMMEND_TIPS.RECOMMEND_AFTER_GATE.value), { classGradeTip: recommendClassGradeTip })) //
            } else {
                return orig
            }
        }
    }

    //加折叠
    addFoldFlag(flights, gate, showMoreClassGradeText, isLast) {
        if (!flights || flights.size === 0)
            return flights
        if (isLast) {
            return flights
            // return flights.map((flight, index) => {
            //     return flight.set('isCFRecommendYS', true)
            // })
        } else {
            let isFold = flights.first().getIn(['recommendGroup', 'isFold']) && flights.size > RECOMMEND_TIPS.YS_FOLD_GATE.value,
                newFlights = flights
            if (isFold && (!this.selectAppendShowMore || this.selectAppendShowMore === 'hide')) {
                return newFlights.map((flight, index) => {
                    if (index >= gate)
                        return flight.set('_isFoldHide', true)//.set('isCFRecommendYS', true)
                    return flight//.set('isCFRecommendYS', true)
                }).updateIn([newFlights.size - 1, '_appendShowMore'], item => item = 'hide').setIn([newFlights.size - 1, 'showMoreClassGradeText'], showMoreClassGradeText)
            } else if (isFold && this.selectAppendShowMore === 'show') {
                return newFlights.updateIn([newFlights.size - 1, '_appendShowMore'], item => item = 'show')
            } else {
                return newFlights
            }
        }


    }

    //添加推荐标识
    addRecommendFlag(flights) {
        return flights.map(flight => {
            return flight.set('isCFRecommendYS', true)
        })
    }

    //获取两舱分组后的结果
    getSortedFlights(flights, isOnlyAddRecommendFlag) {
        let groupedFlights = this.groupFlights(flights)
        let resultType = this.getResultCategory(groupedFlights)
        let direct = this.isSortedByDirectFirst ? '|DIRECT_FIRST' : '|NONE_DIRECT_FIRST'
        let {
            cfDirect,
            fDirect,
            cDirect,
            cFlights,
            fFlights,
            cfFlights,
            ysDirect,
            yDirect,
            sDirect,
            cfTransfer,
            cTransfer,
            fTransfer
        } = groupedFlights

        let tip = '',
            noYS = ysDirect.size <= 0,
            noCFTransfer = cfTransfer.size <= 0,
            cTransferSize = cTransfer.size,
            fTransferSize = fTransfer.size,
            cDirectSize = cDirect.size,
            fDirectSize = fDirect.size,
            yDirectSize = yDirect.size,
            sDirectSize = sDirect.size



        //处理只添加推荐标识 isOnlyAddRecommendFlag
        if (isOnlyAddRecommendFlag) {
            let getRecYSUbtStr = arr => {
                if (yDirectSize > 0) {
                    arr.push('Y')
                }
                if (sDirectSize > 0) {
                    arr.push('S')
                }
                if (yDirectSize == 0 && sDirectSize == 0 && ysDirect.size > 0) {
                    arr.push('YS')
                }
            }
            switch (`${this.searchType}`) {
                //C
                case 'SEARCH_C':
                    this.isNotCFRecommendYS = !(fFlights.size > 0 || ysDirect.size > 0)
                    fFlights = this.addRecommendFlag(fFlights)
                    //两舱推荐埋点
                    if (!this.isNotCFRecommendYS) {
                        let RecClassC = []
                        if (fDirectSize > 0) {
                            RecClassC.push('F')
                        }
                        getRecYSUbtStr(RecClassC)
                        CFRecYSUbt.setRecommendInfo(this.searchType, cDirectSize, cTransferSize, fDirectSize + ysDirect.size, RecClassC.join(''))
                    }

                    return cFlights.concat(fFlights).concat(ysDirect)
                //F
                case 'SEARCH_F':
                    this.isNotCFRecommendYS = !(cFlights.size > 0 || ysDirect.size > 0)
                    cFlights = this.addRecommendFlag(cFlights)
                    //两舱推荐埋点
                    if (!this.isNotCFRecommendYS) {
                        let RecClassF = []
                        if (cDirectSize > 0) {
                            RecClassF.push('C')
                        }
                        getRecYSUbtStr(RecClassF)
                        CFRecYSUbt.setRecommendInfo(this.searchType, fDirectSize, fTransferSize, cDirectSize + ysDirect.size, RecClassF.join(''))
                    }

                    return fFlights.concat(cFlights).concat(ysDirect)
                //CF
                case 'SEARCH_FC':
                default:
                    this.isNotCFRecommendYS = !(ysDirect.size > 0)
                    //两舱推荐埋点
                    if (!this.isNotCFRecommendYS) {
                        let RecClassCF = []
                        getRecYSUbtStr(RecClassCF)
                        CFRecYSUbt.setRecommendInfo(this.searchType, cfDirect.size, cfTransfer.size, ysDirect.size, RecClassCF.join(''))
                    }

                    return flights
            }
        } else {
            switch (`${this.searchType}`) {
                //C
                case 'SEARCH_C':
                    this.isNotCFRecommendYS = !(fFlights.size > 0 || ysDirect.size > 0)
                    break
                //F
                case 'SEARCH_F':
                    this.isNotCFRecommendYS = !(cFlights.size > 0 || ysDirect.size > 0)
                    break
                //CF
                case 'SEARCH_FC':
                    this.isNotCFRecommendYS = !(ysDirect.size > 0)
                default:
                    break
            }
        }

        if (this.isNotCFRecommendYS)
            return flights

        let setRecommendFieldValue = (group, value) => {
            if (group.size)
                return group.setIn([0, 'recommendGroup'], Map(value))
            return group
        }




        let getClassGradeTip = type => {
            let resHead = [], resTail = '', typeArr = type.split('_'),
                classGradeNum = typeArr[0].split('/'),
                directTransferInfo = typeArr[1]
            if (directTransferInfo == 'DIRECT')
                resTail = ` 直飞航班`
            if (directTransferInfo == 'TRANSFER')
                resTail = ` 中转航班`
            if (directTransferInfo == 'DIRECTANDTRANSFER')
                resTail = ` 航班`

            classGradeNum.forEach((c, index) => {
                let isLast = index == classGradeNum.length - 1
                switch (c) {
                    case 'C':
                        resHead.push(isLast ? '公务舱' : '公务')
                        break
                    case 'F':
                        resHead.push(isLast ? '头等舱' : '头等')
                        break
                    case 'Y':
                        resHead.push(isLast ? '经济舱' : '经济')
                        break
                    case 'S':
                        resHead.push(isLast ? '超级经济舱' : '超级经济')
                        break
                }
            })

            return resHead.join('/') + resTail
        },

            getDirectTransferParam = (transferSize, rec) => {
                let allTransfer = false, param = '_DIRECT'
                if (transferSize > 0) {
                    allTransfer = transferSize == rec.size
                    if (allTransfer)
                        param = '_TRANSFER'
                    else
                        param = '_DIRECTANDTRANSFER'
                }

                return {
                    iconType: allTransfer ? RECOMMEND_TIPS.CF_TRANSFER_CLASSGRADE_TIPS.iconType : RECOMMEND_TIPS.Y_DIRECT_CLASSGRADE_TIPS.iconType,
                    param: param
                }
            }

        let cfTransferTipParam = [],
            cysDirectTipParam = [],
            fysDirectTipParam = [],
            ysDirectTipParam = []


        if (yDirectSize > 0)
            ysDirectTipParam.push('Y')
        if (sDirectSize > 0)
            ysDirectTipParam.push('S')
        if (yDirectSize == 0 && sDirectSize == 0 && ysDirect.size > 0) {
            ysDirectTipParam.push('Y')
            ysDirectTipParam.push('S')
        }

        if (cTransferSize > 0)
            cfTransferTipParam.push('C')
        if (fTransferSize > 0)
            cfTransferTipParam.push('F')
        if (cTransferSize == 0 && fTransferSize == 0 && cfTransfer.size > 0) {
            cfTransferTipParam.push('C')
            cfTransferTipParam.push('F')
        }

        //获取正常航班和推荐类的航班
        // let nonRecommendFlights = List([]),
        //     recommendYSFlights = List([]),
        //     recommendCFlights = List([]),
        //     recommendFFlights = list([])

        switch (`${resultType}${direct}`) {

            //CF

            case 'SEARCH_FC|HAS_DIRECT|DIRECT_FIRST':
                //CF有直飞 直飞优先排序: CF直飞>YS直飞(推荐 fold)>CF中转
                if (noYS) {
                    return cfDirect.concat(cfTransfer)
                } else {
                    tip = RECOMMEND_TIPS.MORE_CLASSGRADE_OPTIONS.value
                }

                ysDirect = this.addRecommendFlag(ysDirect)

                //折叠
                let isLast = cfTransfer.size == 0,
                    ysDirectClassGradeTip = getClassGradeTip(ysDirectTipParam.join('/') + '_DIRECT')
                return setRecommendFieldValue(cfDirect, {
                    tip: '',
                    classGradeTip: ''
                }).concat(this.addFoldFlag(setRecommendFieldValue(ysDirect, {
                    tip: tip,
                    classGradeTip: ysDirectClassGradeTip,
                    iconType: RECOMMEND_TIPS.YS_DIRECT_CLASSGRADE_TIPS.iconType,
                    isFold: ysDirect.size > RECOMMEND_TIPS.YS_FOLD_GATE.value
                }), RECOMMEND_TIPS.YS_FOLD_GATE.value, ysDirectClassGradeTip, isLast)).concat(setRecommendFieldValue(cfTransfer, {
                    tip: '',
                    classGradeTip: getClassGradeTip(cfTransferTipParam.join('/') + '_TRANSFER'),
                    iconType: RECOMMEND_TIPS.CF_TRANSFER_CLASSGRADE_TIPS.iconType
                }))
            case 'SEARCH_FC|NODIRECT_HAS_TRANSFER|DIRECT_FIRST':
                //CF无直飞有中转 直飞优先排序: 无直飞提示>YS直飞(推荐)>CF中转
                if (noYS) {
                    return cfTransfer
                    // return setRecommendFieldValue(cfTransfer, {
                    //     tip: RECOMMEND_TIPS.CF_NODIRECT_TIPS.value,
                    //     classGradeTip: RECOMMEND_TIPS.CF_TRANSFER_CLASSGRADE_TIPS.value,
                    //     iconType: RECOMMEND_TIPS.CF_TRANSFER_CLASSGRADE_TIPS.iconType,
                    //     classGradeChildTip: RECOMMEND_TIPS.TRANSFER_CHILD_TIPS.value
                    // })
                } else {
                    //折叠
                    // let newYsDirect1 = this.addFoldFlag(ysDirect, RECOMMEND_TIPS.YS_FOLD_GATE.value)
                    ysDirect = this.addRecommendFlag(ysDirect)
                    // if(cTransferSize > 0)
                    //     cfTransferTipParam.push('C')
                    // if(fTransferSize > 0)
                    //     cfTransferTipParam.push('F')
                    let isLast1 = cfTransfer.size == 0,
                        ysDirectClassGradeTip1 = getClassGradeTip(ysDirectTipParam.join('/') + '_DIRECT')
                    return this.addFoldFlag(setRecommendFieldValue(ysDirect, {
                        tip: RECOMMEND_TIPS.CF_NODIRECT_TIPS.value,
                        classGradeTip: ysDirectClassGradeTip1,
                        iconType: RECOMMEND_TIPS.YS_DIRECT_CLASSGRADE_TIPS.iconType,
                        isFold: ysDirect.size > RECOMMEND_TIPS.YS_FOLD_GATE.value
                    }), RECOMMEND_TIPS.YS_FOLD_GATE.value, ysDirectClassGradeTip1, isLast1).concat(setRecommendFieldValue(cfTransfer, {
                        tip: '',
                        classGradeTip: getClassGradeTip(cfTransferTipParam.join('/') + '_TRANSFER'),
                        iconType: RECOMMEND_TIPS.CF_TRANSFER_CLASSGRADE_TIPS.iconType,
                        classGradeChildTip: RECOMMEND_TIPS.TRANSFER_CHILD_TIPS.value
                    }))
                }

            case 'SEARCH_FC|NORESULT|DIRECT_FIRST':
            case 'SEARCH_FC|NORESULT|NONE_DIRECT_FIRST':
                //CF无结果 无结果提示+YS直飞(推荐不收起)
                if (ysDirect.size <= 0)
                    return ysDirect
                ysDirect = this.addRecommendFlag(ysDirect)
                let ysDirectClassGradeTip2 = getClassGradeTip(ysDirectTipParam.join('/') + '_DIRECT')
                return setRecommendFieldValue(ysDirect, {
                    tip: RECOMMEND_TIPS.CF_NORESULT_TIPS.value,
                    classGradeTip: ysDirectClassGradeTip2,
                    iconType: RECOMMEND_TIPS.YS_DIRECT_CLASSGRADE_TIPS.iconType
                })

            case 'SEARCH_FC|HAS_DIRECT|NONE_DIRECT_FIRST':
                //CF有直飞 非直飞优先排序: CF直飞 CF中转>提示语 YS直飞(推荐)
                if (noYS) {
                    return cfFlights //cfDirect.concat(cfTransfer)
                } else {
                    tip = RECOMMEND_TIPS.MORE_CLASSGRADE_OPTIONS.value
                }
                ysDirect = this.addRecommendFlag(ysDirect)
                //折叠
                let ysDirectClassGradeTip3 = getClassGradeTip(ysDirectTipParam.join('/') + '_DIRECT')
                return this.insertRecommendedFlights(setRecommendFieldValue(cfFlights, {
                    tip: '',
                    classGradeTip: ''
                }), setRecommendFieldValue(ysDirect, {
                    tip: RECOMMEND_TIPS.MORE_CLASSGRADE_OPTIONS.value,
                    classGradeTip: ysDirectClassGradeTip3,
                    iconType: RECOMMEND_TIPS.YS_DIRECT_CLASSGRADE_TIPS.iconType,
                    isFold: ysDirect.size > RECOMMEND_TIPS.YS_FOLD_GATE.value
                }), RECOMMEND_TIPS.CF_DIRECTANDTRANSFER_CLASSGRADE_TIPS.value)
            case 'SEARCH_FC|NODIRECT_HAS_TRANSFER|NONE_DIRECT_FIRST':
                //CF无直飞有中转 非直飞优先排序: CF中转>无直飞提示语 YS直飞(推荐)
                //折叠
                if (noYS)
                    return cfTransfer
                ysDirect = this.addRecommendFlag(ysDirect)
                // if(cTransferSize > 0)
                //     cfTransferTipParam.push('C')
                // if(fTransferSize > 0)
                //     cfTransferTipParam.push('F')
                let ysDirectClassGradeTip4 = getClassGradeTip(ysDirectTipParam.join('/') + '_DIRECT')
                return this.insertRecommendedFlights(setRecommendFieldValue(cfTransfer, {
                    tip: ''
                }), setRecommendFieldValue(ysDirect, {
                    tip: RECOMMEND_TIPS.CF_NODIRECT_TIPS.value,
                    classGradeTip: ysDirectClassGradeTip4,
                    iconType: RECOMMEND_TIPS.YS_DIRECT_CLASSGRADE_TIPS.iconType,
                    isFold: ysDirect.size > RECOMMEND_TIPS.YS_FOLD_GATE.value
                }), getClassGradeTip(cfTransferTipParam.join('/') + '_TRANSFER'))

            //C

            case 'SEARCH_C|HAS_DIRECT|DIRECT_FIRST':
                //C有直飞 直飞优先排序: C直飞>FYS直飞(推荐提示语 fold)>CF中转
                let fysDirect = fDirect.concat(ysDirect)
                if (fysDirect.size <= 0 && fTransfer.size <= 0) {
                    return cDirect.concat(cfTransfer)
                } else {
                    tip = RECOMMEND_TIPS.MORE_CLASSGRADE_OPTIONS.value
                }
                fysDirect = this.addRecommendFlag(fysDirect)
                fTransfer = this.addRecommendFlag(fTransfer)
                //折叠
                // if(cTransferSize > 0)
                //     cfTransferTipParam.push('C')
                // if(fTransferSize > 0)
                //     cfTransferTipParam.push('F')
                if (fDirectSize > 0)
                    fysDirectTipParam.push('F')
                if (yDirectSize > 0)
                    fysDirectTipParam.push('Y')
                if (sDirectSize > 0)
                    fysDirectTipParam.push('S')
                let fysDirectClassGradeTip = getClassGradeTip(fysDirectTipParam.join('/') + '_DIRECT'),
                    isLast2 = cfTransfer.size == 0
                if (fysDirect.size <= 0) {
                    return setRecommendFieldValue(cDirect.concat(cTransfer), {
                        tip: '',
                        classGradeTip: ''
                    }).concat(setRecommendFieldValue(fTransfer, {
                        tip: tip,
                        classGradeTip: getClassGradeTip('F_TRANSFER'),
                        iconType: RECOMMEND_TIPS.CF_TRANSFER_CLASSGRADE_TIPS.iconType
                    }))
                } else {
                    return setRecommendFieldValue(cDirect, {
                        tip: '',
                        classGradeTip: ''
                    }).concat(this.addFoldFlag(setRecommendFieldValue(fysDirect, {
                        tip: tip,
                        classGradeTip: fysDirectClassGradeTip,
                        iconType: RECOMMEND_TIPS.FYS_DIRECT_CLASSGRADE_TIPS.iconType,
                        isFold: fysDirect.size > RECOMMEND_TIPS.YS_FOLD_GATE.value
                    }), RECOMMEND_TIPS.YS_FOLD_GATE.value, fysDirectClassGradeTip, isLast2)).concat(setRecommendFieldValue(cfTransfer, {
                        tip: '',
                        classGradeTip: getClassGradeTip(cfTransferTipParam.join('/') + '_TRANSFER'),
                        iconType: RECOMMEND_TIPS.CF_TRANSFER_CLASSGRADE_TIPS.iconType
                    }))
                }

            case 'SEARCH_C|NODIRECT_HAS_TRANSFER|DIRECT_FIRST':
                //C无直飞有中转 直飞优先排序: 无直飞提示 F/S/Y直飞(fold)>CF中转
                let fysDirect1 = fDirect.concat(ysDirect)
                //折叠
                // let newFysDirect5 = this.addFoldFlag(fysDirect1, RECOMMEND_TIPS.YS_FOLD_GATE.value)
                if (fysDirect1.size <= 0 && fTransfer.size <= 0) {
                    return cfTransfer
                }
                fysDirect1 = this.addRecommendFlag(fysDirect1)
                fTransfer = this.addRecommendFlag(fTransfer)
                tip = RECOMMEND_TIPS.C_NODIRECT_TIPS.value
                // if(cTransferSize > 0)
                //     cfTransferTipParam.push('C')
                // if(fTransferSize > 0)
                //     cfTransferTipParam.push('F')
                if (fDirectSize > 0)
                    fysDirectTipParam.push('F')
                if (yDirectSize > 0)
                    fysDirectTipParam.push('Y')
                if (sDirectSize > 0)
                    fysDirectTipParam.push('S')
                let fysDirectClassGradeTip1 = getClassGradeTip(fysDirectTipParam.join('/') + '_DIRECT'),
                    isLast3 = cfTransfer.size == 0
                if (fysDirect1.size <= 0) {
                    return setRecommendFieldValue(cTransfer, {
                        tip: '',
                        classGradeTip: ''
                    }).concat(setRecommendFieldValue(fTransfer, {
                        tip: tip,
                        classGradeTip: getClassGradeTip('F_TRANSFER'),
                        iconType: RECOMMEND_TIPS.CF_TRANSFER_CLASSGRADE_TIPS.iconType
                    }))
                } else
                    return this.addFoldFlag(setRecommendFieldValue(fysDirect1, {
                        tip: tip,
                        classGradeTip: fysDirectClassGradeTip1,
                        iconType: RECOMMEND_TIPS.FYS_DIRECT_CLASSGRADE_TIPS.iconType,
                        isFold: fysDirect1.size > RECOMMEND_TIPS.YS_FOLD_GATE.value
                    }), RECOMMEND_TIPS.YS_FOLD_GATE.value, fysDirectClassGradeTip1, isLast3).concat(setRecommendFieldValue(cfTransfer, {
                        tip: '',
                        classGradeTip: getClassGradeTip(cfTransferTipParam.join('/') + '_TRANSFER'),
                        iconType: RECOMMEND_TIPS.CF_TRANSFER_CLASSGRADE_TIPS.iconType
                    }))
            case 'SEARCH_C|NORESULT|DIRECT_FIRST':
                //C无结果 无结果提示 FYS直飞(推荐不收起) F中转
                let ffysREcommend2D = fDirect.concat(ysDirect)
                ffysREcommend2D = this.addRecommendFlag(ffysREcommend2D)
                fTransfer = this.addRecommendFlag(fTransfer)
                if (fDirectSize > 0)
                    fysDirectTipParam.push('F')
                if (yDirectSize > 0)
                    fysDirectTipParam.push('Y')
                if (sDirectSize > 0)
                    fysDirectTipParam.push('S')

                let directTransferParamD = getDirectTransferParam(0, ffysREcommend2D)
                return this.addFoldFlag(setRecommendFieldValue(ffysREcommend2D, {
                    tip: RECOMMEND_TIPS.C_NORESULT_TIPS.value,
                    classGradeTip: getClassGradeTip(fysDirectTipParam.join('/') + directTransferParamD.param),
                    iconType: directTransferParamD.iconType,
                    isFold: ffysREcommend2D.size > RECOMMEND_TIPS.YS_FOLD_GATE.value
                }), RECOMMEND_TIPS.YS_FOLD_GATE.value, '', fTransferSize <= 0).concat(setRecommendFieldValue(fTransfer, {
                    tip: ffysREcommend2D.size > 0 ? '' : RECOMMEND_TIPS.C_NORESULT_TIPS.value,
                    classGradeTip: getClassGradeTip('F_TRANSFER'),
                    iconType: RECOMMEND_TIPS.CF_TRANSFER_CLASSGRADE_TIPS.iconType
                }))
            case 'SEARCH_C|NORESULT|NONE_DIRECT_FIRST':
                //C无结果 无结果提示 FYS直飞(推荐不收起)
                let ffysREcommend2 = fFlights.concat(ysDirect)
                ffysREcommend2 = this.addRecommendFlag(ffysREcommend2)
                if (fDirectSize > 0 || fTransferSize > 0)
                    fysDirectTipParam.push('F')
                if (yDirectSize > 0)
                    fysDirectTipParam.push('Y')
                if (sDirectSize > 0)
                    fysDirectTipParam.push('S')
                let directTransferParam = getDirectTransferParam(fTransferSize, ffysREcommend2)
                return setRecommendFieldValue(ffysREcommend2, {
                    tip: RECOMMEND_TIPS.C_NORESULT_TIPS.value,
                    classGradeTip: getClassGradeTip(fysDirectTipParam.join('/') + directTransferParam.param),
                    iconType: directTransferParam.iconType
                })

            case 'SEARCH_C|HAS_DIRECT|NONE_DIRECT_FIRST':
                //C有直飞 非直飞优先排序: C直飞 C中转>提示语 F直飞 F中转 YS直飞(推荐不收起)
                let ffysRecommend = fFlights.concat(ysDirect)
                if (ffysRecommend.size <= 0) {
                    return cDirect.concat(cTransfer)
                } else
                    tip = RECOMMEND_TIPS.MORE_CLASSGRADE_OPTIONS.value
                ffysRecommend = this.addRecommendFlag(ffysRecommend)
                //折叠
                if (fDirectSize > 0 || fTransferSize > 0)
                    fysDirectTipParam.push('F')
                if (yDirectSize > 0)
                    fysDirectTipParam.push('Y')
                if (sDirectSize > 0)
                    fysDirectTipParam.push('S')
                let directTransferParam1 = getDirectTransferParam(fTransferSize, ffysRecommend)
                return this.insertRecommendedFlights(setRecommendFieldValue(cFlights, {
                    tip: '',
                    classGradeTip: ''
                }), setRecommendFieldValue(ffysRecommend, {
                    tip: tip,
                    classGradeTip: getClassGradeTip(fysDirectTipParam.join('/') + directTransferParam1.param),
                    iconType: directTransferParam1.iconType,
                    isFold: ffysRecommend.size > RECOMMEND_TIPS.YS_FOLD_GATE.value
                }), cTransferSize > 0 ? RECOMMEND_TIPS.C_DIRECT_OR_TRANSFER_CLASSGRADE_TIPS.value : RECOMMEND_TIPS.C_NONEDIRECT_CLASSGRADE_TIPS.value)
            case 'SEARCH_C|NODIRECT_HAS_TRANSFER|NONE_DIRECT_FIRST':
                //C无直飞有中转 非直飞优先排序: C中转>提示语 F直飞中转 YS直飞(推荐)
                let ffysRecommend1 = fFlights.concat(ysDirect)
                if (ffysRecommend1.size <= 0) {
                    return cTransfer
                } else {
                    tip = RECOMMEND_TIPS.MORE_CLASSGRADE_OPTIONS.value
                }
                ffysRecommend1 = this.addRecommendFlag(ffysRecommend1)
                //折叠
                if (fDirectSize > 0 || fTransferSize > 0)
                    fysDirectTipParam.push('F')
                if (yDirectSize > 0)
                    fysDirectTipParam.push('Y')
                if (sDirectSize > 0)
                    fysDirectTipParam.push('S')
                let directTransferParam2 = getDirectTransferParam(fTransferSize, ffysRecommend1)
                return this.insertRecommendedFlights(setRecommendFieldValue(cTransfer, {
                    tip: ''
                }), setRecommendFieldValue(ffysRecommend1, {
                    tip: tip,
                    classGradeTip: getClassGradeTip(fysDirectTipParam.join('/') + directTransferParam2.param),
                    iconType: directTransferParam2.iconType,
                    isFold: ffysRecommend1.size > RECOMMEND_TIPS.YS_FOLD_GATE.value
                }), RECOMMEND_TIPS.C_TRANSFER_CLASSGRADE_TIPS.value)

            //F

            case 'SEARCH_F|HAS_DIRECT|DIRECT_FIRST':
                //F有直飞 直飞优先排序: F直飞>CYS直飞(推荐提示语 fold)>CF中转
                let cysDirect = cDirect.concat(ysDirect)
                //折叠
                if (cysDirect.size <= 0 && cTransfer.size <= 0) {
                    return fDirect.concat(cfTransfer)
                } else {
                    tip = RECOMMEND_TIPS.MORE_CLASSGRADE_OPTIONS.value
                }

                cysDirect = this.addRecommendFlag(cysDirect)
                cTransfer = this.addRecommendFlag(cTransfer)

                // if(cTransferSize > 0) {
                //     cfTransferTipParam.push('C')
                // }
                // if(fTransferSize > 0)
                //     cfTransferTipParam.push('F')
                if (cDirectSize > 0)
                    cysDirectTipParam.push('C')
                if (yDirectSize > 0)
                    cysDirectTipParam.push('Y')
                if (sDirectSize > 0)
                    cysDirectTipParam.push('S')
                let cysDirectClassGradeTip = getClassGradeTip(cysDirectTipParam.join('/') + '_DIRECT'),
                    isLast4 = cfTransfer.size == 0

                if (cysDirect.size <= 0) {
                    return setRecommendFieldValue(fDirect.concat(fTransfer), {
                        tip: '',
                        classGradeTip: ''
                    }).concat(setRecommendFieldValue(cTransfer, {
                        tip: tip,
                        classGradeTip: getClassGradeTip('C_TRANSFER'),
                        iconType: RECOMMEND_TIPS.CF_TRANSFER_CLASSGRADE_TIPS.iconType
                    }))
                } else {
                    return setRecommendFieldValue(fDirect, {
                        tip: '',
                        classGradeTip: ''
                    }).concat(this.addFoldFlag(setRecommendFieldValue(cysDirect, {
                        tip: RECOMMEND_TIPS.MORE_CLASSGRADE_OPTIONS.value,
                        classGradeTip: cysDirectClassGradeTip,
                        iconType: RECOMMEND_TIPS.CYS_DIRECT_CLASSGRADE_TIPS.iconType,
                        isFold: cysDirect.size > RECOMMEND_TIPS.YS_FOLD_GATE.value
                    }), RECOMMEND_TIPS.YS_FOLD_GATE.value, cysDirectClassGradeTip, isLast4)).concat(setRecommendFieldValue(cfTransfer, {
                        tip: '',
                        classGradeTip: getClassGradeTip(cfTransferTipParam.join('/') + '_TRANSFER'),
                        iconType: RECOMMEND_TIPS.CF_TRANSFER_CLASSGRADE_TIPS.iconType
                    }))
                }
            case 'SEARCH_F|NODIRECT_HAS_TRANSFER|DIRECT_FIRST':
                //F无直飞有中转 直飞优先排序: 无直飞提示 C/S/Y直飞(fold)>CF中转
                let cysDirect1 = cDirect.concat(ysDirect)
                if (cysDirect1.size <= 0 && cTransfer.size <= 0) {
                    return cfTransfer
                }
                cysDirect1 = this.addRecommendFlag(cysDirect1)
                cTransfer = this.addRecommendFlag(cTransfer)
                // if(cTransferSize > 0)
                //     cfTransferTipParam.push('C')
                // if(fTransferSize > 0)
                //     cfTransferTipParam.push('F')
                if (cDirectSize > 0)
                    cysDirectTipParam.push('C')
                if (yDirectSize > 0)
                    cysDirectTipParam.push('Y')
                if (sDirectSize > 0)
                    cysDirectTipParam.push('S')
                if (cysDirect1.size <= 0) {
                    return setRecommendFieldValue(fTransfer, {
                        tip: '',
                        classGradeTip: ''
                    }).concat(setRecommendFieldValue(cTransfer, {
                        tip: tip,
                        classGradeTip: getClassGradeTip('C_TRANSFER'),
                        iconType: RECOMMEND_TIPS.CF_TRANSFER_CLASSGRADE_TIPS.iconType
                    }))
                } else {
                    //折叠
                    let cysDirectClassGradeTip1 = getClassGradeTip(cysDirectTipParam.join('/') + '_DIRECT'),
                        isLast5 = cfTransfer.size == 0
                    return this.addFoldFlag(setRecommendFieldValue(cysDirect1, {
                        tip: RECOMMEND_TIPS.F_NODIRECT_TIPS.value,
                        classGradeTip: cysDirectClassGradeTip1,
                        iconType: RECOMMEND_TIPS.CYS_DIRECT_CLASSGRADE_TIPS.iconType,
                        isFold: cysDirect1.size > RECOMMEND_TIPS.YS_FOLD_GATE.value
                    }), RECOMMEND_TIPS.YS_FOLD_GATE.value, cysDirectClassGradeTip1, isLast5).concat(setRecommendFieldValue(cfTransfer, {
                        tip: '',
                        classGradeTip: getClassGradeTip(cfTransferTipParam.join('/') + '_TRANSFER'),
                        iconType: RECOMMEND_TIPS.CF_TRANSFER_CLASSGRADE_TIPS.iconType
                    }))
                }
            case 'SEARCH_F|NORESULT|DIRECT_FIRST':
                //F无结果 无结果提示 CYS直飞(推荐不收起)
                let ccysGroupD = cDirect.concat(ysDirect)//.concat(cTransfer)

                ccysGroupD = this.addRecommendFlag(ccysGroupD)
                cTransfer = this.addRecommendFlag(cTransfer)

                if (cDirectSize > 0)
                    cysDirectTipParam.push('C')
                if (yDirectSize > 0)
                    cysDirectTipParam.push('Y')
                if (sDirectSize > 0)
                    cysDirectTipParam.push('S')

                let directTransferParam3D = getDirectTransferParam(0, ccysGroupD)
                return this.addFoldFlag(setRecommendFieldValue(ccysGroupD, {
                    tip: RECOMMEND_TIPS.F_NORESULT_TIPS.value,
                    classGradeTip: getClassGradeTip(cysDirectTipParam.join('/') + directTransferParam3D.param),
                    iconType: directTransferParam3D.iconType,
                    isFold: ccysGroupD.size > RECOMMEND_TIPS.YS_FOLD_GATE.value
                }), RECOMMEND_TIPS.YS_FOLD_GATE.value, '', cTransferSize <= 0).concat(setRecommendFieldValue(cTransfer, {
                    tip: ccysGroupD.size > 0 ? '' : RECOMMEND_TIPS.F_NORESULT_TIPS.value,
                    classGradeTip: getClassGradeTip('C_TRANSFER'),
                    iconType: RECOMMEND_TIPS.CF_TRANSFER_CLASSGRADE_TIPS.iconType
                }))
            case 'SEARCH_F|NORESULT|NONE_DIRECT_FIRST':
                //F无结果 无结果提示 CYS直飞(推荐不收起)
                let ccysGroup = cFlights.concat(ysDirect)

                ccysGroup = this.addRecommendFlag(ccysGroup)

                if (cDirectSize > 0 || cTransferSize > 0)
                    cysDirectTipParam.push('C')
                if (yDirectSize > 0)
                    cysDirectTipParam.push('Y')
                if (sDirectSize > 0)
                    cysDirectTipParam.push('S')
                let directTransferParam3 = getDirectTransferParam(cTransferSize, ccysGroup)
                return setRecommendFieldValue(ccysGroup, {
                    tip: RECOMMEND_TIPS.F_NORESULT_TIPS.value,
                    classGradeTip: getClassGradeTip(cysDirectTipParam.join('/') + directTransferParam3.param),
                    iconType: directTransferParam3.iconType
                })

            case 'SEARCH_F|HAS_DIRECT|NONE_DIRECT_FIRST':
                //F有直飞 非直飞优先排序: F直飞 F中转>提示语 C直飞 C中转 YS直飞(推荐不收起)
                let ccysRecommend = cFlights.concat(ysDirect)
                if (ccysRecommend.size <= 0) {
                    return fDirect.concat(fTransfer)
                } else {
                    ccysRecommend = this.addRecommendFlag(ccysRecommend)
                    //折叠
                    if (cDirectSize > 0 || cTransferSize > 0)
                        cysDirectTipParam.push('C')
                    if (yDirectSize > 0)
                        cysDirectTipParam.push('Y')
                    if (sDirectSize > 0)
                        cysDirectTipParam.push('S')
                    let directTransferParam4 = getDirectTransferParam(cTransferSize, ccysRecommend)
                    return this.insertRecommendedFlights(setRecommendFieldValue(fFlights, {
                        tip: '',
                        classGradeTip: ''
                    }), setRecommendFieldValue(ccysRecommend, {
                        tip: RECOMMEND_TIPS.MORE_CLASSGRADE_OPTIONS.value,
                        classGradeTip: getClassGradeTip(cysDirectTipParam.join('/') + directTransferParam4.param),
                        iconType: directTransferParam4.iconType,
                        isFold: ccysRecommend.size > RECOMMEND_TIPS.YS_FOLD_GATE.value
                    }), fTransferSize > 0 ? RECOMMEND_TIPS.F_DIRECT_OR_TRANSFER_CLASSGRADE_TIPS.value : RECOMMEND_TIPS.F_DIRECT_CLASSGRADE_TIPS.value)
                }
            case 'SEARCH_F|NODIRECT_HAS_TRANSFER|NONE_DIRECT_FIRST':
                //F无直飞有中转 非直飞优先排序: F中转>提示语 C直飞中转 YS直飞(推荐)
                let ccysRecommend1 = cFlights.concat(ysDirect)
                if (ccysRecommend1.size <= 0) {
                    return fTransfer
                }
                ccysRecommend1 = this.addRecommendFlag(ccysRecommend1)
                //折叠
                if (cDirectSize > 0 || cTransferSize > 0)
                    cysDirectTipParam.push('C')
                if (yDirectSize > 0)
                    cysDirectTipParam.push('Y')
                if (sDirectSize > 0)
                    cysDirectTipParam.push('S')
                let directTransferParam5 = getDirectTransferParam(cTransferSize, ccysRecommend1)
                return this.insertRecommendedFlights(setRecommendFieldValue(fTransfer, {
                    tip: ''
                }), setRecommendFieldValue(ccysRecommend1, {
                    tip: RECOMMEND_TIPS.MORE_CLASSGRADE_OPTIONS.value,
                    classGradeTip: getClassGradeTip(cysDirectTipParam.join('/') + directTransferParam5.param),
                    iconType: directTransferParam5.iconType,
                    isFold: ccysRecommend1.size > RECOMMEND_TIPS.YS_FOLD_GATE.value
                }), RECOMMEND_TIPS.F_TRANSFER_CLASSGRADE_TIPS.value)

            //Y/S
            case 'SEARCH_Y|NORESULT|DIRECT_FIRST':
            case 'SEARCH_Y|NORESULT|NONE_DIRECT_FIRST':
                //Y无结果S有结果： 无结果提示语 S
                return setRecommendFieldValue(sDirect, {
                    tip: RECOMMEND_TIPS.Y_NODIRECT_TIPS.value,
                    classGradeTip: RECOMMEND_TIPS.S_DIRECT_CLASSGRADE_TIPS.value,
                    iconType: RECOMMEND_TIPS.S_DIRECT_CLASSGRADE_TIPS.iconType
                })
            case 'SEARCH_S|NORESULT|DIRECT_FIRST':
            case 'SEARCH_S|NORESULT|NONE_DIRECT_FIRST':
                //S无结果Y有结果： 无结果提示语 Y
                return setRecommendFieldValue(sDirect, {
                    tip: RECOMMEND_TIPS.S_NODIRECT_TIPS.value,
                    classGradeTip: RECOMMEND_TIPS.Y_DIRECT_CLASSGRADE_TIPS.value,
                    iconType: RECOMMEND_TIPS.Y_DIRECT_CLASSGRADE_TIPS.iconType
                })
            default:
                return flights
        }
        

    }

    has(arr, propPath, target) {
        return arr.some(item => item.get(propPath) === target)
    }

    all(arr, propPath, target) {
        return arr.every(item => item.get(propPath) === target)
    }
    //单搜C/F时过滤掉保持只有C/F
    FCMixFilter(flight, hasClassGrade) {
        let _this = this, counterCabin = (hasClassGrade == 'C' ? 'F' : 'C')
        return flight.update('priceList', priceList => {
            let firstCabin = this.handleClassGrade(priceList.getIn([0, 'cabin']).split('|')),
                allSameCabin = priceList.every(p => this.handleClassGrade(p.get('cabin').split('|')) === firstCabin)
            if (allSameCabin) {
                return priceList
            } else {
                return priceList.filter(price => {
                    if (this.handleClassGrade(price.get('cabin').split('|')) === hasClassGrade)
                        return true
                })
            }
        })
    }


    converterFCMixFilter(flight, hasClassGrade) {
        let _this = this, counterCabin = (hasClassGrade == 'C' ? 'F' : 'C'),
            priceList = flight.priceList
        let firstCabin = this.handleClassGrade(priceList[0].cabin.split('|')),
            allSameCabin = priceList.every(p => this.handleClassGrade(p.cabin.split('|')) === firstCabin)
        if (allSameCabin) {
            flight.priceList = priceList
        } else {
            flight.priceList = priceList.filter(price => {
                if (this.handleClassGrade(price.cabin.split('|')) === hasClassGrade)
                    return true
            })
        }
        return flight
    }

    handleClassGrade(arr) {
        if (arr.length == 1) {
            return this.getMainClassGrade(arr[0])
        } else if (arr.length > 1) {
            let cgFlag = '',
                hasY,
                hasS,
                hasF,
                hasC
            for (let i = 0, len = arr.length; i < len; i++) {
                let cabin = this.getMainClassGrade(arr[i])
                if (cabin.indexOf('Y') !== -1) {
                    // cgFlag = 'Y'
                    return 'Y'
                }

                if (cabin.indexOf('S') !== -1) {
                    hasS = true
                }

                if (cabin.indexOf('F') !== -1) {
                    hasF = true
                }

                if (cabin.indexOf('C') !== -1) {
                    hasC = true
                }
            }

            if (hasS)
                return 'S'
            if (hasC)
                return 'C'
            if (hasF)
                return 'F'
            // never
            return ''
        }
    }

    getMainClassGrade(classGrades) {
        let classGradesArr = classGrades.split && classGrades.split('-')
        if (Array.isArray(classGradesArr)) {
            for (let j = 0, len = classGradesArr.length; j < len; j++) {
                if (classGradesArr[j].indexOf('@') >= 0)
                    return classGradesArr[j].replace('@', '')
            }
            return classGradesArr[0] || ''
        }
        return ''
    }

    //获取航组的舱等
    getClassGrade(flight) {
        let cabin = {}
        flight.get('priceList').forEach(price => {
            let priceCabin = this.handleClassGrade(price.get('cabin').split('|'))
            if (priceCabin.indexOf('C') !== -1) {
                cabin['C'] = true
            }
            if (priceCabin.indexOf('F') !== -1) {
                cabin['F'] = true
            }
            if (priceCabin.indexOf('Y') !== -1) {
                cabin['Y'] = true
            }
            if (priceCabin.indexOf('S') !== -1) {
                cabin['S'] = true
            }
        })


        if (cabin['Y'] && cabin['S'])
            return 'YS'
        if (cabin['Y'])
            return 'Y'
        if (cabin['S'])
            return 'S'

        if (cabin['C'] && cabin['F'])
            return 'CF'
        if (cabin['C'])
            return 'C'
        if (cabin['F'])
            return 'F'
    }

    isDirect(flight) {
        if (!this.isRoundTripCombination) {
            let seg = flight.get('flightSegments').get(0)
            return seg.get('transferCount') === 0 && seg.get('stopCount') === 0 ? 'DIRECT' : 'TRANSFER'
        } else { //往返组合要去程和返程都为直飞才算是直飞
            let segArr = flight.get('flightSegments'),
                hasDirect = false,
                hasTransfer = false
            segArr.forEach(item => {
                if (item.get('transferCount') === 0 && item.get('stopCount') === 0)
                    hasDirect = true
                else
                    hasTransfer = true
            })
            if (hasDirect && !hasTransfer)
                return 'DIRECT'
            if (hasDirect && hasTransfer)
                return 'DIRECT_TRANSFER'
            else
                return 'TRANSFER'
            // return segArr.every(item => (item.get('transferCount') === 0 && item.get('stopCount') === 0))
        }
    }

    groupFlights(flights) {
        let cfDirect = List([]),
            fDirect = List([]),
            cDirect = List([]),
            cFlights = List([]),
            fFlights = List([]),
            cfFlights = List([]),
            ysDirect = List([]),
            yDirect = List([]),
            sDirect = List([]),
            cfTransfer = List([]),
            cTransfer = List([]),
            fTransfer = List([]),
            cfDirectAndTransfer = List([]),
            cDirectAndTransfer = List([]),
            fDirectAndTransfer = List([]),
            _this = this

        //过滤掉虚拟航班
        // flights.filter(flight => {
        //     return !this.has(flight.get('flightSegments'), 'containsVirtualFlight', true)
        // })
        // flights.map(flight => {
        //     //过滤舱等
        //     if(_this.isSearchOrFilterF)
        //         return _this.FCMixFilter(flight, 'F')
        //     if(_this.isSearchOrFilterC)
        //         return _this.FCMixFilter(flight, 'C')
        //     return flight
        // })
        flights.forEach(flight => {
            let classGrade = _this.getClassGrade(flight),
                dirInfoStr = _this.isDirect(flight),
                isDirect = dirInfoStr === 'DIRECT',
                isTransfer = dirInfoStr === 'TRANSFER',
                isDirectAndTransfer = dirInfoStr === 'DIRECT_TRANSFER',
                
                isCorF = classGrade == 'CF' || classGrade == 'C' || classGrade == 'F',
                isYorS = classGrade == 'YS' || classGrade == 'Y' || classGrade == 'S',
                isC = classGrade == 'C',
                isF = classGrade == 'F',
                isY = classGrade == 'Y',
                isS = classGrade == 'S'

            //把非两舱推荐的YS航班当作正常的CF航班来分组处理(这里从数据的源头修改
            //可以省去许多冗余的处理过程，如果此处没有修改成用户搜索的舱等会有很多麻烦的处理如：如何将这个YS插入到CF中又保持直飞和其他排序的顺序正常，既然可以当成CF来处理那就把它变成CF)
            if(isYorS && !flight.get('isFCRecommendYS')) {
                isYorS = false
                switch(this.searchType) {
                    case 'SEARCH_FC':
                        isCorF = true
                    case 'SEARCH_F':
                        isF = true
                    case 'SEARCH_C':
                        isC = true
                }
            }
                
            if (isDirect && isCorF) {
                cfDirect = cfDirect.push(flight)
            }
            if (isDirect && isC) {
                cDirect = cDirect.push(flight)
            }
            if (isCorF) {
                cfFlights = cfFlights.push(flight)
            }
            if (isC) {
                cFlights = cFlights.push(flight)
            }
            if (isDirect && isF) {
                fDirect = fDirect.push(flight)
            }
            if (isF) {
                fFlights = fFlights.push(flight)
            }
            //TODO get ysDirect
            if (isDirect && isYorS && flight.get('isFCRecommendYS')) {
                ysDirect = ysDirect.push(flight)
            }
            if (isDirect && isY && flight.get('isFCRecommendYS')) {
                yDirect = yDirect.push(flight)
            }
            if (isDirect && isS && flight.get('isFCRecommendYS')) {
                sDirect = sDirect.push(flight)
            }

            if (!isDirect && isTransfer && isCorF) {
                cfTransfer = cfTransfer.push(flight)
            }
            if (!isDirect && isTransfer && isC) {
                cTransfer = cTransfer.push(flight)
            }
            if (!isDirect && isTransfer && isF) {
                fTransfer = fTransfer.push(flight)
            }

            if (isDirectAndTransfer && isCorF) {
                cfDirectAndTransfer = cfDirectAndTransfer.push(flight)
            }
            if (isDirectAndTransfer && isC) {
                cDirectAndTransfer = cDirectAndTransfer.push(flight)
            }
            if (isDirectAndTransfer && isF) {
                fDirectAndTransfer = fDirectAndTransfer.push(flight)
            }
        })

        cfTransfer = cfDirectAndTransfer.concat(cfTransfer)
        cTransfer = cDirectAndTransfer.concat(cTransfer)
        fTransfer = fDirectAndTransfer.concat(fTransfer)

        return {
            cfDirect,
            fDirect,
            cDirect,
            cFlights,
            fFlights,
            cfFlights,
            ysDirect,
            yDirect,
            sDirect,
            cfTransfer,
            cTransfer,
            fTransfer
        }
    }

    //过滤航组中CF和
}

export const getCFRecommendYSGroupTips = flight => {
    let recommendGroup = flight.get('recommendGroup'),
        classGradeTip = recommendGroup && recommendGroup.get('classGradeTip'),
        classGradeTipComponent

    if (!recommendGroup)
        return null
    else {
        if (classGradeTip) {
            //tip backup recommendGroup.get('iconType') === 'ico-transfer' ?RECOMMEND_TIPS.TRANSFER_CHILD_TIPS.value : RECOMMEND_TIPS.MORE_OPTIONS_CHILD_TIPS.value
            classGradeTipComponent = <GroupTitle key={2} title={classGradeTip} tip='' iconClassName={recommendGroup.get('iconType')} />
        }

        return classGradeTipComponent
    }
}

export const getCFRecommendYSAppendShowMore = (flight, changeAppendShowMoreVisibility) => {
    if (flight.get('_appendShowMore') === 'hide') {
        //${flight.get('showMoreClassGradeText') || ''}
        return <ShowMore title={`查看更多直飞航班`} onClick={changeAppendShowMoreVisibility('show')} />
    }

    if (flight.get('_appendShowMore') === 'show') {
        return <ShowMore title={`收起 `} iconClassName="arrow-up-bold" onClick={changeAppendShowMoreVisibility('hide')} />
    }

    return null
}


export const getCFRecommendYSTip = flight => {
    let recommendGroup = flight && flight.get('recommendGroup'),
        tip = recommendGroup && recommendGroup.get('tip'),
        tipComponent

    if (!recommendGroup)
        return null
    else {
        if (tip) {
            tipComponent = <NoResultTip key={1} label={tip} iconClassName={'ico-nodirect'} />
        }
        return tipComponent
    }
}

export default CFRecommendYSUtil
