const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();
const inputArray = input.split('\n').map((line) => line.split(' '));

class FileSystemTree {
  constructor() {
    this.root = new DirectoryNode('root', null);
    this.current = this.root;
  }

  moveDown(dirName) {
    const dir = this.current.children.find(
      (child) => child instanceof DirectoryNode && child.name === dirName
    );
    this.current = dir;
  }

  moveUp() {
    this.current = this.current.parent;
  }

  moveToRoot() {
    this.current = this.root;
  }

  addDir(name) {
    const newDir = new DirectoryNode(name, this.current);
    this.current.children.push(newDir);
  }

  addFile(size, name) {
    const newFile = new FileNode(size, name);
    this.current.children.push(newFile);
  }
}

class DirectoryNode {
  constructor(name, parent) {
    this.name = name;
    this.parent = parent;
    this.sizeSubTree = 0;
    this.children = [];
  }
}

class FileNode {
  constructor(size, name) {
    this.size = size;
    this.name = name;
  }
}

function constructTree(inputArray) {
  const tree = new FileSystemTree();

  inputArray.forEach((line) => {
    if (line[0] === '$' && line[1] === 'ls') return;
    if (line[0] === '$' && line[1] === 'cd') {
      switch (line[2]) {
        case '..':
          return tree.moveUp();
        case '/':
          return tree.moveToRoot();
        default:
          return tree.moveDown(line[2]);
      }
    }
    if (line[0] === 'dir') {
      return tree.addDir(line[1]);
    }
    if (!isNaN(line[0])) {
      return tree.addFile(+line[0], line[1]);
    }
    throw new Error('Unknown Command or Output: ' + line.join(' '));
  });

  return tree;
}

const myFileSystemTree = constructTree(inputArray);
// console.log(myFileSystemTree);

function calcSizeSubTree(dirNode) {
  if (dirNode.sizeSubTree) {
    return dirNode.sizeSubTree;
  }
  let sum = 0;
  for (const child of dirNode.children) {
    if (child instanceof FileNode) {
      sum += child.size;
    } else {
      const childDirSize = calcSizeSubTree(child);
      sum += childDirSize;
    }
  }
  dirNode.sizeSubTree = sum;
  return sum;
}

calcSizeSubTree(myFileSystemTree.root);
// console.log(myFileSystemTree);

function getDirAtMost(upperLimit, tree) {
  const resultArray = [];
  const root = tree.root;

  function traverseRecursion(dirNode) {
    if (dirNode.sizeSubTree <= upperLimit) {
      resultArray.push(dirNode);
    }
    dirNode.children.forEach((child) => {
      if (child instanceof DirectoryNode) {
        traverseRecursion(child);
      }
    });
  }
  traverseRecursion(root);
  return resultArray;
}

const dirAtMost100000 = getDirAtMost(100000, myFileSystemTree);
const result_1 = dirAtMost100000.reduce(
  (sum, currNode) => sum + currNode.sizeSubTree,
  0
);
// Part 1
// console.log(result_1);

// Part 2
const allDirs = getDirAtMost(Infinity, myFileSystemTree);
const allDirsSizes = allDirs.map((dir) => dir.sizeSubTree);
const rootSize = myFileSystemTree.root.sizeSubTree;
const sizeToFreeUp = rootSize - 40000000;
const sizeAndDiffArray = allDirsSizes.map((size) => [
  size,
  size - sizeToFreeUp,
]);
const result_2 = sizeAndDiffArray
  .filter((array) => array[1] >= 0)
  .reduce((min, curr) => (min[1] <= curr[1] ? min : curr));
console.log(result_2[0]);
