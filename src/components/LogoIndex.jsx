import { Image } from "react-native";

export default function LogoIndex({ size = 100, color = "#ffffff" }) {
    return (
        <Image
            source={require('../../assets/logoIndex.png')}
            style={{ width: size, height: size }}
            resizeMode="contain"
        />
    )
}   
