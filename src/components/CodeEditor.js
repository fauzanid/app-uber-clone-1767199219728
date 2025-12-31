import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import FileExplorer from './FileExplorer';

const { width } = Dimensions.get('window');

const CodeEditor = () => {
  const [activeFile, setActiveFile] = useState('App.js');
  const [openTabs, setOpenTabs] = useState(['App.js']);
  const [code, setCode] = useState({
    'App.js': `import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});`,
    'package.json': `{
  "name": "my-app",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios"
  },
  "dependencies": {
    "expo": "~49.0.0",
    "react": "18.2.0",
    "react-native": "0.72.6"
  }
}`,
  });
  const [showExplorer, setShowExplorer] = useState(true);

  const openFile = (fileName) => {
    if (!openTabs.includes(fileName)) {
      setOpenTabs([...openTabs, fileName]);
    }
    setActiveFile(fileName);
    if (!code[fileName]) {
      setCode({ ...code, [fileName]: '// New file\n' });
    }
  };

  const closeTab = (fileName) => {
    const newTabs = openTabs.filter(tab => tab !== fileName);
    setOpenTabs(newTabs);
    if (activeFile === fileName && newTabs.length > 0) {
      setActiveFile(newTabs[0]);
    }
  };

  const saveFile = () => {
    // Simulate saving
    console.log(`Saved ${activeFile}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.explorerToggle}
          onPress={() => setShowExplorer(!showExplorer)}
        >
          <Text style={styles.explorerToggleText}>📁</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Code Editor</Text>
        <TouchableOpacity style={styles.saveButton} onPress={saveFile}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.main}>
        {/* File Explorer */}
        {showExplorer && (
          <View style={styles.explorer}>
            <FileExplorer onFileSelect={openFile} />
          </View>
        )}

        {/* Editor Area */}
        <View style={[styles.editor, !showExplorer && styles.editorFull]}>
          {/* Tabs */}
          <ScrollView
            horizontal
            style={styles.tabsContainer}
            showsHorizontalScrollIndicator={false}
          >
            {openTabs.map((tab) => (
              <View key={tab} style={styles.tab}>
                <TouchableOpacity
                  style={[
                    styles.tabButton,
                    activeFile === tab && styles.activeTab,
                  ]}
                  onPress={() => setActiveFile(tab)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeFile === tab && styles.activeTabText,
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
                {openTabs.length > 1 && (
                  <TouchableOpacity
                    style={styles.closeTab}
                    onPress={() => closeTab(tab)}
                  >
                    <Text style={styles.closeTabText}>×</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </ScrollView>

          {/* Code Input */}
          <TextInput
            style={styles.codeInput}
            value={code[activeFile] || ''}
            onChangeText={(text) => setCode({ ...code, [activeFile]: text })}
            multiline
            placeholder="Start coding..."
            placeholderTextColor="#666"
            textAlignVertical="top"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#2d2d2d',
    borderBottomWidth: 1,
    borderBottomColor: '#404040',
  },
  explorerToggle: {
    marginRight: 12,
  },
  explorerToggleText: {
    fontSize: 20,
    color: '#fff',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#007acc',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  main: {
    flex: 1,
    flexDirection: 'row',
  },
  explorer: {
    width: width * 0.3,
    backgroundColor: '#252526',
    borderRightWidth: 1,
    borderRightColor: '#404040',
  },
  editor: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  editorFull: {
    width: width,
  },
  tabsContainer: {
    backgroundColor: '#2d2d2d',
    maxHeight: 40,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#404040',
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  activeTab: {
    backgroundColor: '#1e1e1e',
  },
  tabText: {
    color: '#ccc',
    fontSize: 14,
  },
  activeTabText: {
    color: '#fff',
  },
  closeTab: {
    paddingHorizontal: 4,
  },
  closeTabText: {
    color: '#ccc',
    fontSize: 16,
  },
  codeInput: {
    flex: 1,
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#d4d4d4',
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 16,
    paddingVertical: 16,
    lineHeight: 20,
  },
});

export default CodeEditor;