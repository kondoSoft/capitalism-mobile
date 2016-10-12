/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import * as Progress from 'react-native-progress';

export default class KondoCapitalism extends Component {
  constructor(props){
    super(props)
    this.state = {
      buyedStand:{
        lemonade:{
          name: 'lemonade',
          revenue:200
          ,
          standPrice:200,
          quantityStand:1,
          time:500,
          width: 0,
          running: false,
          indexRevenue: 1.2,
          newStandPrice:1000,
          initTime: 0
        }
      },
      availableStand:{
        newspaper:{
          revenue:100,
          standPrice:250,
          quantityStand:1,
          time:1500,
          name:'newspaper',
          width: 0,
          running: false,
          indexRevenue: 1.8,
          newStandPrice:1050,
          initTime: 0
        },
        donutShop:{
          revenue:150,
          standPrice:400,
          quantityStand:1,
          time:10000,
          name:'donutShop',
          width: 0,
          running: false,
          indexRevenue: 1.8,
          newStandPrice:1500,
          initTime: 0
        },
        pizzaShop:{
          revenue:205,
          standPrice:750,
          quantityStand:1,
          time:2000,
          name:'pizzaShop',
          width: 0,
          running: false,
          indexRevenue: 1.8,
          newStandPrice:1750,
          initTime: 0
        },
        bank:{
          revenue:150,
          standPrice:830,
          quantityStand:1,
          time:1000,
          name:'bank',
          width: 0,
          running: false,
          indexRevenue: 1.8,
          newStandPrice:3000,
          initTime: 0
        },
        movieStudio:{
          revenue:150,
          standPrice:1050,
          quantityStand:1,
          time:1000,
          name:'movieStudio',
          width: 0,
          running: false,
          indexRevenue: 1.8,
          newStandPrice:4200,
          initTime: 0
        },
        oilCompany:{
          revenue:150,
          standPrice:1250,
          quantityStand:1,
          time:1000,
          name:'oilCompany',
          width: 0,
          running: false,
          indexRevenue: 1.8,
          newStandPrice:10000,
          initTime: 0
        }
      },
      capital: 0,
    }
    this.addStand = this.addStand.bind(this)
    this.loading = this.loading.bind(this)
    this.buyStand = this.buyStand.bind(this)
  }
  sumCapital(revenue){
    var total = this.state.capital + revenue
    this.setState({capital: total})
  }
  addStand(name) {
    console.log('Hiciste click');
    var state = this.state
    var buyedStand = state.buyedStand
    var capital = state.capital
    var total
    var revenue
    var standPrice
    if (capital >= buyedStand[name].standPrice) {
      total = capital - buyedStand[name].standPrice
      buyedStand[name].quantityStand++
      revenue = Math.round(buyedStand[name].revenue + (buyedStand[name].quantityStand * buyedStand[name].indexRevenue))
      buyedStand[name].revenue = revenue
      standPrice = buyedStand[name].standPrice + (buyedStand[name].quantityStand * 2)
      buyedStand[name].standPrice =  standPrice
      this.setState({capital:total})
      this.setState({buyedStand:buyedStand})
    }
  }
  loading(key){
    console.log('Hiciste click');
    var state = this.state
    if (state.buyedStand[key].running === false) {
      var initTime = Date.now()
      state.buyedStand[key].initTime = initTime
      state.buyedStand[key].running = !state.buyedStand[key].running
    }
  }
  buyStand(key){
    var state = this.state
    var availableStand = state.availableStand
    var buyedStand = state.buyedStand
    var capital = state.capital
    var total
    if (capital >= availableStand[key].newStandPrice) {
      total = capital - availableStand[key].newStandPrice
      buyedStand[key] = availableStand[key]
      this.setState({buyedStand:buyedStand})
      delete availableStand[key]
      this.setState({capital:total})
    }
  }
  componentDidMount(){
    let interval = setInterval(()=>{
      var stands = this.state.buyedStand
      Object.keys(stands).map((key)=>{
        if (stands[key].initTime !== 0){
          // Do what ever operation you need...
          var tiempoActual = Date.now()
          var tiempoTranscurrido = tiempoActual - stands[key].initTime;
          var porcentaje = tiempoTranscurrido / stands[key].time
          if(stands[key].width >= 1.1){
            stands[key].width = 0
            stands[key].initTime = 0
            stands[key].running = !stands[key].running
            this.setState({buyedStand:stands})
            this.sumCapital(stands[key].revenue)
          }else{
            console.log(porcentaje);
            stands[key].width = porcentaje
            this.setState({buyedStand:stands})
          }
        }
      })
    }, 1000/30)
  }
  render() {
    return (
      <ScrollView style={styles.container}>

        <MainContainer
          addStand={this.addStand}
          capital={this.state.capital}
          buyedStand={this.state.buyedStand}
          availableStand={this.state.availableStand}
          loading={this.loading}
          buyStand={this.buyStand}
        />
      </ScrollView>
    );
  }
}

class MainContainer extends Component{
  renderItemsGame(){
    var buyedStand = this.props.buyedStand
    return(
      Object.keys(buyedStand).map((item, key)=>{
        return (
          <GameItem key={key}
            revenue={buyedStand[item].revenue}
            quantity={buyedStand[item].quantityStand}
            time={buyedStand[item].time}
            name={buyedStand[item].name}
            width={buyedStand[item].width}
            standPrice={buyedStand[item].standPrice}
            addStand={this.props.addStand}
            capital={this.props.capital}
            loading={this.props.loading}
          />
        )
      })
    )
  }
  renderItemsAvailable(){
    var availableStand = this.props.availableStand
    return(
      Object.keys(availableStand).map((item, key) =>{
        return(
          <AvailableStand
            key={key}
            revenue={availableStand[item].revenue}
            quantity={availableStand[item].quantityStand}
            time={availableStand[item].time}
            name={availableStand[item].name}
            standPrice={availableStand[item].standPrice}
            buyStand={this.props.buyStand}
            newStandPrice={availableStand[item].newStandPrice}
            capital={this.props.capital}
          />
        )
      })
    )
  }
  render(){
    return(
      <View>
        <Capital capital={this.props.capital}/>
        {this.renderItemsGame()}
        {this.renderItemsAvailable()}
      </View>
    )
  }
}

class GameItem extends Component{
  render(){
    return(
      <View style={{borderWidth:1, borderColor: 'blue'}}>
        <View style={styles.row}>
          <BarProgress
            width={this.props.width}
            revenue={this.props.revenue}
            loading={this.props.loading}
            time={this.props.time}
            name={this.props.name}
            capital={this.props.capital}
          />
          <Thumbnail
            name={this.props.name}
            quantity={this.props.quantity}
            loading={this.props.loading}
          />
        </View>
        <RevenueBuyStandContainer
          name={this.props.name}
          standPrice={this.props.standPrice}
          addStand={this.props.addStand}
          revenue={this.props.revenue}
        />
      </View>
    )
  }
}


class BarProgress extends Component{
  render(){
    let myBar = {
      position:'absolute',
      width:this.props.width,
      height: 30,
      backgroundColor: 'green',
    }
    let name = this.props.name
    return <Progress.Bar
      progress={this.props.width}
      width={290}
      height={30}
      onTouchStart={() => this.props.loading(name)} color='green'/>
  }
}

class Capital extends Component{
  render(){
    return(
      <View>
        <Text style={{textAlign:'center'}}>${this.props.capital}</Text>
      </View>
    )
  }
}

class Thumbnail extends Component{
  render(){
    return(
      <View onTouchStart={() => this.props.loading(this.props.name)}>
        <Image style={{borderRadius:25}} source={require('./assets/images/place.png')}/>
        <Text style={{textAlign:'center'}}>{this.props.quantity}</Text>
      </View>
    )
  }
}

class RevenueBuyStandContainer extends Component{
  render(){
    return(
      <View style={styles.row}>
        <BuyStand
          addStand={this.props.addStand}
          name={this.props.name}
          standPrice={this.props.standPrice}
        />
        <Revenue
          revenue={this.props.revenue}
        />
      </View>
    )
  }
}

class Revenue extends Component{
  render(){
    return(
      <View>
        <Text>${this.props.revenue}</Text>
      </View>
    )
  }
}

class BuyStand extends Component{
  render(){
    return(
      <View onTouchStart={() => this.props.addStand(this.props.name)}>
        <Text>Buy x1</Text>
        <Text>${this.props.standPrice}</Text>
      </View>
    )
  }
}

class AvailableStand extends Component{
  render(){
    return(
      <View style={styles.availableStand} onTouchStart={() => this.props.buyStand(this.props.name)}>
        <Image
          style={{borderRadius: 25}}
          source={require('./assets/images/place.png')} />
        <View>
          <Text>{this.props.name}</Text>
          <Text>${this.props.newStandPrice}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop:20,
    backgroundColor: '#F5FCFF',
  },
  myProgress:{
    position: 'relative',
    width: 300,
    height: 30,
    backgroundColor: 'lightgray',
  },
  label:{
    textAlign: 'center',
    lineHeight: 30,
    color: 'black',
  },
  progressBar:{
    position: 'relative',
    width: 100,
    top: 15,
  },
  row:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  },
  availableStand:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    borderColor:'red',
    borderWidth: 1,
  }
});

AppRegistry.registerComponent('KondoCapitalism', () => KondoCapitalism);
