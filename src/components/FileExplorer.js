import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const FileExplorer = ({ onFileSelect }) => {
  const [expandedFolders, setExpandedFolders] = useState(['src']);

  const fileStructure = [
    {
      name: 'App.js',
      type: 'file',
    },
    {
      name: 'package.json',
      type: 'file',
    },
    {
      name: 'src',
      type: 'folder',
      children: [
        {
          name: 'components',
          type: 'folder',
          children: [
            { name: 'Header.js', type: 'file' },
            { name: 'Button.js', type: 'file' },
          ],
        },
        {
          name: 'screens',
          type: 'folder',
          children: [
            { name: 'HomeScreen.js', type: 'file' },
            { name: 'ProfileScreen.js', type: 'file' },
          ],
        },
        { name: 'utils.js', type: 'file' },
      ],
    },
  ];

  const toggleFolder = (folderName) => {
    if (expandedFolders.includes(folderName)) {
      setExpandedFolders(expandedFolders.filter(f => f !== folderName));
    } else {
      setExpandedFolders([...expandedFolders, folderName]);
    }
  };

  const renderItem = (item, depth = 0, path = '') => {
    const currentPath = path ? `${path}/${item.name}` : item.name;
    const isExpanded = expandedFolders.includes(currentPath);

    return (
      <View key={currentPath}>
        <TouchableOpacity
          style={[
            styles.item,
            { paddingLeft: 16 + (depth * 20) },
          ]}
          onPress={() => {
            if (item.type === 'folder') {
              toggleFolder(currentPath);
            } else {
              onFileSelect(item.name);
            }
          }}
        >
          <Text style={styles.itemIcon}>
            {item.type === 'folder'
              ? isExpanded
                ? '📂'
                : '📁'
              : '📄'
            }
          </Text>
          <Text style={styles.itemName}>{item.name}</Text>
        </TouchableOpacity>
        
        {item.type === 'folder' && isExpanded && item.children && (
          <View>
            {item.children.map(child =>
              renderItem(child, depth + 1, currentPath)
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explorer</Text>
      </View>
      <ScrollView style={styles.content}>
        {fileStructure.map(item => renderItem(item))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#2d2d2d',
    borderBottomWidth: 1,
    borderBottomColor: '#404040',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  content: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingRight: 16,
  },
  itemIcon: {
    marginRight: 8,
    fontSize: 16,
  },
  itemName: {
    flex: 1,
    color: '#d4d4d4',
    fontSize: 14,
  },
});

export default FileExplorer;