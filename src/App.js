import React, {useState, useEffect} from "react";

import {
	SafeAreaView,
	View,
	FlatList,
	Text,
	StatusBar,
	StyleSheet,
	TouchableOpacity,
	Button,
} from "react-native";

import api from './services/api'

export default function App() {

	const [repositories, setRepositories] = useState([])

	useEffect(() => {
		api.get('repositories').then(response => {
			setRepositories(response.data)
		})
	}, [])

	async function handleLikeRepository(id) {
		await api.post(`repositories/${id}/like`)
		const repositoryIndex = repositories.findIndex(repository => repository.id === id)
		
		repositories[repositoryIndex].likes ++;
		setRepositories([...repositories])
	}

	return (
		<>
			<StatusBar barStyle="light-content" backgroundColor="#7159c1" />
			<SafeAreaView style={styles.container}>
			
				<FlatList 
					style={styles.container}
					data={repositories}
					keyExtractor={repository => repository.id}
					renderItem={({ item: repo }) => (
						
						<View style={styles.repositoryContainer}>
							<Text style={styles.repository}>
								{repo.title}
							</Text>

							<View style={styles.techsContainer}>
								{repo.techs.map(tech => (
									<Text key={tech} style={styles.tech}>
										{tech}
									</Text>
								))}
							</View>

							<View style={styles.likesContainer}>
								<Text
									style={styles.likeText}
									// Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
									testID={`repository-likes-${repo.id}`}
								>
									{repo.likes} curtidas
								</Text>
							</View>

							<Text 
								style={styles.buttonText}
								onPress={() => handleLikeRepository(repo.id)}
							>
								Curtir
							</Text>

							<TouchableOpacity
								style={styles.button}
								onPress={() => handleLikeRepository(repo.id)}
								// Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
								testID={`like-button-${repo.id}`}
							>
								<Text style={styles.buttonText}>Curtir Não funciona Galaxy J7</Text>
							</TouchableOpacity>
						</View>

					)}
				/>

			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	global: {
		backgroundColor: 'red'
	},
	container: {
		flex: 1,
		backgroundColor: "#7159c1",
	},
	repositoryContainer: {
		marginBottom: 15,
		marginHorizontal: 15,
		backgroundColor: "#fff",
		padding: 20,
	},
	repository: {
		fontSize: 32,
		fontWeight: "bold",
	},
	techsContainer: {
		flexDirection: "row",
		marginTop: 10,
	},
	tech: {
		fontSize: 12,
		fontWeight: "bold",
		marginRight: 10,
		backgroundColor: "#04d361",
		paddingHorizontal: 10,
		paddingVertical: 5,
		color: "#fff",
	},
	likesContainer: {
		marginTop: 15,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	likeText: {
		fontSize: 14,
		fontWeight: "bold",
		marginRight: 10,
	},
	button: {
		marginTop: 10,
	},
	buttonText: {
		fontSize: 14,
		fontWeight: "bold",
		marginRight: 10,
		color: "#fff",
		backgroundColor: "#7159c1",
		padding: 15,
	},
});
