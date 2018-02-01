// 数据结构练习
// 栈
class Stack {
	constructor() {
		this.items = []
	}
	push(ele) {
		this.items.push(ele)
	}
	pop() {
		return this.items.pop()
	}
	clear() {
		this.items = []
	}
	get size() {
		return this.items.length
	}
	print() {
		console.log(this.items.toString())
	}
}

// 队
class Queue {
	constructor() {
		this.items = []
	}
	push(ele) {
		this.items.push(ele)
	}
	pop() {
		return this.items.shift()
	}
	clear() {
		this.items = []
	}
	get size() {
		return this.items.length
	}
	empty() {
		return this.items.length === 0
	}
}

// 环状队
class LoopQueue extends Queue {
	constructor(items) {
		super(items)
	}
	getIndex(index) {
		const len = this.items.length
		return index > len ? index % len : index
	}
	find(index) {
		return !this.empty ? this.items[this.getIndex(index)] : null
	}
}

// 链表节点
class linkNode {
	constructor(ele) {
		this.element = ele
		this.next = null
	}
}

// 单链表
class singLinkList {
	constructor() {
		this.items = []
		this.head = null
		this.length = 0
	}
	append(ele) {
		const node = new linkNode(ele)
		let current = null
		if (!this.head) {
			this.head = node
		} else {
			current = this.head
			while (current.next) {
				current = current.next
			}
			current.next = node
		}
		this.length++
	}
	insert(pos, ele) {
		if (pos >= 0 && pos < this.length) {
			const node = new linkNode(ele)
			let current = this.head
			let previous = null
			let index = 0
			if (pos == 0) {
				node.next = current
				this.head = node
			} else {
				while (index < pos) {
					index++
					previous = current
					current = current.next
				}
				node.next = current
				previous.next = node
			}

			this.length++
		}
	}
	remove(pos) {
		if (pos >= 0 && pos < this.length) {
			let current = this.head
			let previous = null
			let index = 0
			if (pos === 0) {
				this.head = current.next
				current.next = null
			} else {
				while (index < pos) {
					index++
					previous = current
					current = current.next
				}
				previous.next = current.next
				current.next = null
			}
			this.length--
		}
	}
	findElement(pos) {
		if (pos >= 0 && pos < this.length) {
			let index = 0
			let current = this.head
			let previous = null
			while (index < pos) {
				previous = current
				current = current.next
				index++
			}
			return current.element
		}
	}
	findIndex(ele) {
		let current = this.head
		let index = -1
		while (current) {
			if (ele === current.element) {
				return index + 1
			}
			index++
			current = current.next
		}
		return index
	}
	removeEle(element) {
		let index = this.findIndex(element)
		return this.remove(index)
	}
	get size() {
		return this.length
	}
}

// 集合
class Set {
	constructor() {
		this.items = []
	}
	add(item) {
		if (!this.has(item)) {
			this.items.push(item)
		}
	}
	remove(item) {
		return this.items.slice(this.items.indexOf(item), 1)
	}
	has(item) {
		return this.items.includes(item)
	}
	get size() {
		return this.items.length
	}
	toString() {
		return this.items
	}
}

// 二叉树节点
class binNode {
	constructor(key) {
		this.key = key
		this.left = null
		this.right = null
	}
}

// 二叉搜索树
class BinarySearchTree {
	constructor() {
		this.root = null
	}
	insert(key) {
		const newNode = new binNode(key)
		const insertNode = (node, newNode) => {
			if (newNode.key < node.key) {
				if (node.left === null) {
					node.left = newNode
				} else {
					insertNode(node.left, newNode)
				}
			} else {
				if (node.right === null) {
					node.right = newNode
				} else {
					insertNode(node.right, newNode)
				}
			}
		}
		if (!this.root) {
			this.root = newNode
		} else {
			insertNode(this.root, newNode)
		}
	}
}
