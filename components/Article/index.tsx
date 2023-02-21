import { FunctionComponent } from "react";
import { Container, Text } from "native-base"
import { Image } from "react-native"
import { IClothes } from "../../Store/reducers/clothes";

const Article: FunctionComponent<{ article: IClothes }> = ({ article }) => {
    return (
        <Container>
                <Image style={{ width: 50, height: 50 }} alt="Article image" source={{ uri: article.image }}/>
            <Container>
                <Text>{article.label}</Text>
                <Text>{article.prix}</Text>
                <Text>{article.couleur}</Text>
            </Container>
        </Container>
    )
}

export { Article }