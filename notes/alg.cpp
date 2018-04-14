
//链表有环
class Solution {
    public:
        ListNode *detectCycle(ListNode *head) {
             if(head == NULL || head->next == NULL) {
                return NULL;
            }
    
            ListNode* fast = head;
            ListNode* slow = head;
    
            while(fast->next != NULL && fast->next->next != NULL) {
                fast = fast->next->next;
                slow = slow->next;
                if(fast == slow) {
                    slow = head;
                    while(slow != fast) {
                        fast = fast->next;
                        slow = slow->next;
                    }
                    return slow;
                }
            }
    
            return NULL;
        }
    };

//两个有序数组子集问题
Array.prototype.isSubArrayOf = function(a){
    if(!a || !(a instanceof Array)) return false;
  
    let b = this;
    let aLength = a.length, bLength = b.length;
    if(aLength < bLength) return false;
  
    let indexA = 0, indexB = 0;
  
    while(indexB < bLength && indexA < aLength ) {
      let tempA = a[indexA], tempB = b[indexB];
  
      if(tempB === tempA) {
        indexA++;
        indexB++;
      } else if(tempB > tempA) {
        indexA++;
      } else {
        return false;
      }
    }
  
    return indexB === bLength;
  }

  function z(a, b) {
    var arr = [].concat(a);
    var index = -1;
    for(var i = 0; i < b.length; i++) {
       index = arr.indexOf(b[i]);
       if(arr.indexOf(b[i]) === -1) {
          return false
       }
       arr.splice(index, 1);
    }
    return true
  }



  /* Return true if arr2[] is a subset of arr1[] */
static boolean isSubset(int arr1[], int arr2[], int m,
    int n)
{
HashSet<Integer> hset= new HashSet<>();

// hset stores all the values of arr1
for(int i = 0; i < m; i++)
{
    if(!hset.contains(arr1[i]))
        hset.add(arr1[i]);
}

// loop to check if all elements of arr2 also
// lies in arr1
for(int i = 0; i < n; i++)
{
    if(!hset.contains(arr2[i]))
        return false;
    }
    return true;
}

//回文数字
class Solution {
    public:
        bool isPalindrome(int x) {
            if(x < 0)
                return false;
            else if(x == 0)
                return true;
            else
            {
                int tmp = x;
                int y = 0;
                while(x != 0)
                {
                    y = y*10 + x%10;
                    x = x/10;
                }
                if(y == tmp)
                    return true;
                else
                    return false;
            }
        }
    };

//二叉数深度
class Solution {
    public:
        int num;
        int maxDepth(TreeNode *root) {
            if(!root) {
                return 0;
            }
    
            //首先初始化num为最小值
            num = numeric_limits<int>::min();
            travel(root, 1);
            return num;
        }
    
        void travel(TreeNode* node, int level) {
            //如果没有左子树以及右子树了，就到了叶子节点
            if(!node->left && !node->right) {
                num = max(num, level);
                return;
            }
    
            if(node->left) {
                travel(node->left, level + 1);
            }
    
            if(node->right) {
                travel(node->right, level + 1);
            }
        }
    };


/*上图是一棵Trie树，表示了关键字集合{“a”, “to”, “tea”, “ted”, “ten”, “i”, “in”, “inn”} 。从上图可以归纳出Trie树的基本性质：

根节点不包含字符，除根节点外的每一个子节点都包含一个字符。
从根节点到某一个节点，路径上经过的字符连接起来，为该节点对应的字符串。
每个节点的所有子节点包含的字符互不相同。

Trie树的核心思想是空间换时间，利用字符串的公共前缀来减少无谓的字符串比较以达到提高查询效率的目的