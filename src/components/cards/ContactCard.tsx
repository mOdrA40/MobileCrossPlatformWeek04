import React, { memo } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Card, Avatar, Text, Divider, Button, IconButton, Surface } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { ContactCardProps } from '../../types';
import { getGradientForName } from '../../utils/helpers';
import theme from '../../theme';

const ContactCard: React.FC<ContactCardProps> = ({ 
  name, 
  email, 
  photoUrl, 
  phone,
  location,
  isFavorite, 
  onToggleFavorite 
}) => {

  const gradientColors = getGradientForName(name);
  
  return (
    <Card style={styles.card} mode="elevated" elevation={3}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <View style={styles.headerContent}>
          <Avatar.Image 
            size={60} 
            source={{ uri: photoUrl }} 
            style={styles.avatar}
          />
          <Surface style={styles.headerInfo} elevation={0}>
            <Text 
              variant="titleMedium" 
              style={styles.nameText} 
              numberOfLines={1} 
              ellipsizeMode="tail"
            >
              {name}
            </Text>
            <View style={styles.contactChipContainer}>
              <View style={styles.contactChip}>
                <IconButton
                  icon="account"
                  size={16}
                  iconColor="#fff"
                  style={styles.contactChipIcon}
                />
                <Text style={styles.contactChipText}>Contact</Text>
              </View>
            </View>
          </Surface>
          <IconButton
            icon={isFavorite ? "star" : "star-outline"}
            iconColor="#fff"
            size={20}
            onPress={() => onToggleFavorite(name)}
            style={styles.favoriteButton}
          />
        </View>
      </LinearGradient>
      
      <Card.Content style={styles.cardContent}>
        <View style={styles.infoRow}>
          <IconButton icon="email" size={20} style={styles.infoIcon} />
          <Text variant="bodyMedium" style={styles.infoText}>{email}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <IconButton icon="phone" size={20} style={styles.infoIcon} />
          <Text variant="bodyMedium" style={styles.infoText}>{phone}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <IconButton icon="map-marker" size={20} style={styles.infoIcon} />
          <Text variant="bodyMedium" style={styles.infoText}>{location}</Text>
        </View>
      </Card.Content>
      
      <Divider />
      
      <Card.Actions style={styles.cardActions}>
        <Button 
          mode="text" 
          icon="email" 
          textColor={theme.colors.primary}
          labelStyle={styles.buttonLabel}
        >
          Email
        </Button>
        <Button 
          mode="text" 
          icon="phone" 
          textColor={theme.colors.primary}
          labelStyle={styles.buttonLabel}
        >
          Call
        </Button>
        <Button 
          mode="text" 
          icon="message-text" 
          textColor={theme.colors.primary}
          labelStyle={styles.buttonLabel}
        >
          Message
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradient: {
    padding: 16,
    paddingVertical: 12,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    marginRight: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
  headerInfo: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    marginRight: 8,
    flexShrink: 1,
  },
  nameText: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    fontSize: 16,
    maxWidth: '100%',
  },
  contactChipContainer: {
    flexDirection: 'row',
  },
  contactChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 20,
    paddingRight: 12,
    paddingLeft: 0,
    height: 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    width: 100,
  },
  contactChipIcon: {
    margin: 0,
    padding: 0,
    width: 28,
    height: 28,
  },
  contactChipText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: -4,
  },
  favoriteButton: {
    margin: 0,
    padding: 0,
  },
  cardContent: {
    paddingVertical: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoIcon: {
    margin: 0,
    marginRight: 8,
  },
  infoText: {
    flex: 1,
  },
  cardActions: {
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 12,
  },
});


export default memo(ContactCard);