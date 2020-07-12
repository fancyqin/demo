import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import {AtButton,AtCard} from 'taro-ui'

export default class Index extends Component {
  
  
  render () {
    return (
      <View className='index'>
        <AtButton>fafaf</AtButton>
        <AtButton type='primary'>按钮文案</AtButton>
        <AtCard
          note='小Tips'
          extra='额外信息'
          title='这是个标题'
          thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
        >
          这也是内容区 可以随意定义功能
        </AtCard>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
