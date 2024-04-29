const Node = (data = null) => {
    return { data, left: null, right: null };
  };
  
  const Tree = (arr) => {
    return { root: buildTree(arr, 0, arr.length - 1) };
  };
  
  function buildTree(arr, start, end) {
    if (start > end) return null;
    let mid = parseInt((start + end) / 2);
    let root = Node(arr[mid]);
    root.left = buildTree(arr, start, mid - 1);
    root.right = buildTree(arr, mid + 1, end);
    return root;
  }
  
  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  
  function insert(val, root) {
    if (root === null) {
      return Node(val);
    }
    if (val < root.data) {
      root.left = insert(val, root.left);
    } else if (val > root.data) {
      root.right = insert(val, root.right);
    }
    return root;
  }
  
  function deleteNode(val, root) {
    if (root === null) {
      return root;
    }
    if (val < root.data) {
      root.left = deleteNode(val, root.left);
      return root;
    } else if (val > root.data) {
      root.right = deleteNode(val, root.right);
      return root;
    }
  
    if (root.left === null) {
      let temp = root.right;
      delete root;
      return temp;
    } else if (root.right === null) {
      let temp = root.left;
      delete root;
      return temp;
    } else {
      let successorParent = root;
      let successor = root.right;
      while (successor.left !== null) {
        successorParent = successor;
        successor = successor.left;
      }
      if (successorParent !== root) {
        successorParent.left = successor.right;
      } else {
        successorParent.right = successor.right;
      }
      root.data = successor.data;
      delete successor;
      return root;
    }
  }
  
  function find(target, root) {
    if (root === null || root.data === target) {
      return root;
    }
    if (target > root.data) {
      return find(target, root.right);
    } else {
      return find(target, root.left);
    }
  }
  
  function levelOrder(root, callback) {
    /*
      We need a queue for saving the discovered nodes. First, we 
      enqueue the root node (arr.push(root)).
  
      If the queue is not empty, we can dequeue the node from the 
      queue (arr.shift()), and print it/store it in a results array.
  
      Then we can enqueue the children of the root node. Next we 
      dequeue/print the first child and enqueue its children, simply
      repeating the process. Becauseof FIFO (first come first served)
      this will play out in level-order. The base-case will be when
      the nodes have no children.
      */
    let queue = [];
    let results = [];
    if (root === null) return;
    queue.push(root);
    while (queue[0]) {
      let currentNode = queue[0];
      if (callback) {
        callback(currentNode);
      }
      results.push(queue.shift().data);
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
    return results;
  }
  
  function preorder(root, results = [], callback) {
    /*
  First visit root, then left subtree, then right subtree.
  Print the root data. Then make a recursive call to  the left child.
  Then make a recursive call to the right subtree. Base case is if
  root is null.
  */
    if (root === null) return;
    if (callback) {
      callback(root);
    }
    results.push(root.data);
    preorder(root.left, results, callback);
    preorder(root.right, results, callback);
    return results;
  }
  
  function inorder(root, results = [], callback) {
    /*
      First visit left subtree, then root, then right subtree
      */
    if (root === null) return;
    inorder(root.left, results, callback);
    if (callback) {
      callback(root);
    }
    results.push(root.data);
    inorder(root.right, results, callback);
    return results;
  }
  
  function postorder(root, results = [], callback) {
    /*
      First visit left subtree, then right subtree, then root
      */
    if (root === null) return;
    postorder(root.left, results, callback);
    postorder(root.right, results, callback);
    if (callback) {
      callback(root);
    }
    results.push(root.data);
    return results;
  }
  
  function height(node, root) {
    if (node === null || !node || find(node.data, root) === false) return -1;
    return Math.max(height(node.left, root), height(node.right, root)) + 1;
  }
  
  function depth(node, root) {
    let level = -1;
    if (root === null) return -1;
    if (
      root === node ||
      (level = depth(node, root.left)) >= 0 ||
      (level = depth(node, root.right)) >= 0
    ) {
      return level + 1;
    }
    return level;
  }
  
  function isBalanced(root) {
    const leftSubtreeHeight = height(root.left, root.left);
    const rightSubtreeHeight = height(root.right, root.right);
    const difference = Math.abs(leftSubtreeHeight - rightSubtreeHeight);
    console.log(difference);
    if (difference > 1) return false;
    else return true;
  }
  
  function rebalance(tree) {
    const inorderArray = inorder(tree.root);
    tree.root = buildTree(inorderArray, 0, inorderArray.length - 1);
  }
  
  //driver script
  const tree = Tree([1, 3, 6, 9, 13, 17, 22, 27, 33, 39]);
  prettyPrint(tree.root);
  console.log(isBalanced(tree.root));
  console.log(levelOrder(tree.root));
  console.log(preorder(tree.root));
  console.log(postorder(tree.root));
  console.log(inorder(tree.root));
  insert(101, tree.root);
  insert(102, tree.root);
  insert(103, tree.root);
  insert(104, tree.root);
  prettyPrint(tree.root);
  console.log(isBalanced(tree.root));
  rebalance(tree);
  prettyPrint(tree.root);
  console.log(isBalanced(tree.root));
  console.log(levelOrder(tree.root));
  console.log(preorder(tree.root));
  console.log(postorder(tree.root));
  console.log(inorder(tree.root));