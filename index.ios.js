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
  ScrollView,
  Animated
} from 'react-native';
import * as Progress from 'react-native-progress';
import * as Animatable from 'react-native-animatable';
import {default as Sound} from 'react-native-sound'
var music = new Sound('level1-step3-evil.wav', Sound.MAIN_BUNDLE, (error) => {
  if(error){
    console.log('Fallo al cargar el audio', error);
  }else{
    console.log('Duracion en segundos: ' + music.getDuration());
  }
})


export default class KondoCapitalism extends Component {
  constructor(props){
    super(props)
    this.state = {
      buyedStand:{
        lemonade:{
          name: 'lemonade',
          revenue:200,
          standPrice:200,
          quantityStand:1,
          time:1000,
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
          newStandPrice:4000,
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
          newStandPrice:4300,
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
    var playBackgroundAudio = setInterval(() => {
      if (music.isLoaded()) {
        music.setNumberOfLoops(-1)
        // music.play()
        clearInterval(playBackgroundAudio)
      }
    },10)

    setInterval(()=>{
      var stands = this.state.buyedStand
      Object.keys(stands).map((key)=>{
        if (stands[key].initTime !== 0){
          // Do what ever operation you need...
          var tiempoActual = Date.now()
          var tiempoTranscurrido = tiempoActual - stands[key].initTime;
          var porcentaje = tiempoTranscurrido / stands[key].time
          if(stands[key].width >= 1){
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
        <AvatarCapitalContainer capital={this.props.capital} />
        {this.renderItemsGame()}
        {this.renderItemsAvailable()}
      </View>
    )
  }
}

class GameItem extends Component{
  render(){
    return(
      <View>
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
          capital={this.props.capital}
        />
      </View>
    )
  }
}


class BarProgress extends Component{
  render(){
    let name = this.props.name
    return (
      <Progress.Bar
        progress={this.props.width}
        width={290}
        height={30}
        onTouchStart={() => this.props.loading(name)}
        color='green'
        animated={false}
      />
    )
  }
}

class AvatarCapitalContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      playing: true,
      open:true,
      animation: 'null',
      menu: false,
      flexValue:5
    }
    this.openCloseMenu = this.openCloseMenu.bind(this)
    this.playPause = this.playPause.bind(this)
  }
  openCloseMenu(){
    if(this.state.menu){
      this.setState({menu:false})
      this.setState({flexValue:5})
      this.setState({animation:'fadeOutLeft'})
    }else {
      this.setState({menu: true})
      this.setState({flexValue:null})
      this.setState({animation:'fadeInLeft'})
    }
  }
  playPause(){
    var playing = this.state.playing
    if (playing == true) {
      music.pause()
      this.state.playing = !playing
    }else {
      music.play()
      this.state.playing = !playing
    }
  }
  render(){
    return(
      <View style={styles.capitalContainer}>
        <Avatar
          openCloseMenu={this.openCloseMenu}
          menu={this.state.menu}
          playPause={this.playPause}
          animation={this.state.animation}
        />
        <Capital capital={this.props.capital} flexValue={this.state.flexValue}/>
      </View>
    )
  }
}

class Capital extends Component{
  render(){
    return(
      <View style={{flex:this.props.flexValue}}>
        <Text style={{fontSize:22, fontWeight:'200'}}>${this.props.capital}</Text>
      </View>
    )
  }
}

class Avatar extends Component{
  render(){
    return(
      <View style={styles.rowMenu}>
        <Image
          style={{marginLeft:5, borderRadius:5}}
          source={require('./assets/images/place.png')}
          onTouchStart={()=> this.props.openCloseMenu()}
        />
        {this.props.menu? <Menu
          animation={this.props.animation}
          playPause={this.props.playPause}/> : null}
      </View>
    )
  }
}

class Menu extends Component{
  render(){
    return(
      <Animatable.View animation={this.props.animation} style={styles.row}>
        <Text onTouchStart={this.props.playPause}>Mute audio</Text>
        <Text>icon</Text>
        <Text>icon</Text>
      </Animatable.View>
    )
  }
}

class Thumbnail extends Component{
  render(){
    return(
      <View onTouchStart={() => this.props.loading(this.props.name)}>
        <Image style={{borderRadius:25}} source={require('./assets/images/place.png')}/>
        <Text style={styles.thumb}>{this.props.quantity}</Text>
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
          capital={this.props.capital}
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
    var capital = this.props.capital
    var standPrice = this.props.standPrice
    var available = (capital >= standPrice)? styles.standAvailable: styles.buyStand;
    return(
      <View style={available} onTouchStart={() => this.props.addStand(this.props.name)}>
        <Text>Buy x1</Text>
        <Text>${standPrice}</Text>
      </View>
    )
  }
}

class AvailableStand extends Component{
  render(){
    var capital = this.props.capital
    var newStandPrice = this.props.newStandPrice
    var available = (capital >= newStandPrice)? styles.availableBuyStand: styles.availableStand;
    return(
      <View style={available} onTouchStart={() => this.props.buyStand(this.props.name)}>
        <Image
          style={{borderRadius: 25}}
          source={require('./assets/images/place.png')} />
        <View>
          <Text>{this.props.name}</Text>
          <Text>${newStandPrice}</Text>
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
    marginTop:10,
    backgroundColor:'gray',
    opacity: 0.3
  },
  availableBuyStand:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    marginTop:10,
    backgroundColor:'#f44336',
    opacity:1
  },
  thumb:{
    backgroundColor:'cornflowerblue',
    textAlign:'center'
  },
  buyStand:{
    backgroundColor:'lightgray',
    opacity:0.3
  },
  standAvailable:{
    backgroundColor:'lightblue',
    opacity:1
  },
  capitalContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center'
  },
  rowMenu:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center'
  }
});

AppRegistry.registerComponent('KondoCapitalism', () => KondoCapitalism);
