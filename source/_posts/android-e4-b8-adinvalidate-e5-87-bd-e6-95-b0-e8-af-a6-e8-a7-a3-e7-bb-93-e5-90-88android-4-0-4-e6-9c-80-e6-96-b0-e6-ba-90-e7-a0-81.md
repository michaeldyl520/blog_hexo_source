---
title: Android中invalidate() 函数详解(结合Android 4.0.4 最新源码)
tags:
  - android
  - invalidate
url: 376.html
id: 376
categories:
  - android
date: 2015-08-11 09:57:13
---

invalidate()函数的主要作用是请求View树进行重绘，该函数可以由应用程序调用，或者由系统函数间接调用，例如setEnable(), setSelected(), setVisiblity()都会间接调用到invalidate()来请求View树重绘，更新View树的显示。 注：requestLayout()和requestFocus()函数也会引起视图重绘 下面我们通过源码来了解invalidate()函数的工作原理，首先我们来看View类中invalidate()的实现过程：

**\[java\]** [view plain](http://blog.csdn.net/zjmdp/article/details/7713209# "view plain")[copy](http://blog.csdn.net/zjmdp/article/details/7713209# "copy")

1.  /**
2.       * Invalidate the whole view. If the view is visible,
3.       * {@link #onDraw(android.graphics.Canvas)} will be called at some point in
4.       * the future. This must be called from a UI thread. To call from a non-UI thread,
5.       * call {@link #postInvalidate()}.
6.       */
7.      public void invalidate() {
8.          invalidate(true);
9.      }

invalidate()函数会转而调用invalidate(true)，继续往下看：

**\[java\]** [view plain](http://blog.csdn.net/zjmdp/article/details/7713209# "view plain")[copy](http://blog.csdn.net/zjmdp/article/details/7713209# "copy")

1.  /**
2.       * This is where the invalidate() work actually happens. A full invalidate()
3.       * causes the drawing cache to be invalidated, but this function can be called with
4.       * invalidateCache set to false to skip that invalidation step for cases that do not
5.       * need it (for example, a component that remains at the same dimensions with the same
6.       * content).
7.       *
8.       * @param invalidateCache Whether the drawing cache for this view should be invalidated as
9.       * well. This is usually true for a full invalidate, but may be set to false if the
10.       * View's contents or dimensions have not changed.
11.       */
12.      void invalidate(boolean invalidateCache) {
13.          if (ViewDebug.TRACE_HIERARCHY) {
14.              ViewDebug.trace(this, ViewDebug.HierarchyTraceType.INVALIDATE);
15.          }

17.          if (skipInvalidate()) {
18.              return;
19.          }
20.          if ((mPrivateFlags & (DRAWN | HAS\_BOUNDS)) == (DRAWN | HAS\_BOUNDS) ||
21.                  (invalidateCache && (mPrivateFlags & DRAWING\_CACHE\_VALID) == DRAWING\_CACHE\_VALID) ||
22.                  (mPrivateFlags & INVALIDATED) != INVALIDATED || isOpaque() != mLastIsOpaque) {
23.              mLastIsOpaque = isOpaque();
24.              mPrivateFlags &= ~DRAWN;
25.              mPrivateFlags |= DIRTY;
26.              if (invalidateCache) {
27.                  mPrivateFlags |= INVALIDATED;
28.                  mPrivateFlags &= ~DRAWING\_CACHE\_VALID;
29.              }
30.              final AttachInfo ai = mAttachInfo;
31.              final ViewParent p = mParent;
32.              //noinspection PointlessBooleanExpression,ConstantConditions
33.              if (!HardwareRenderer.RENDER\_DIRTY\_REGIONS) {
34.                  if (p != null && ai != null && ai.mHardwareAccelerated) {
35.                      // fast-track for GL-enabled applications; just invalidate the whole hierarchy
36.                      // with a null dirty rect, which tells the ViewAncestor to redraw everything
37.                      p.invalidateChild(this, null);
38.                      return;
39.                  }
40.              }

42.              if (p != null && ai != null) {
43.                  final Rect r = ai.mTmpInvalRect;
44.                  r.set(0, 0, mRight - mLeft, mBottom - mTop);
45.                  // Don't call invalidate -- we don't want to internally scroll
46.                  // our own bounds
47.                  p.invalidateChild(this, r);
48.              }
49.          }
50.      }

下面我们来具体进行分析invalidate(true)函数的执行流程： 1、首先调用skipInvalidate()，该函数主要判断该View是否不需要重绘，如果不许要重绘则直接返回，不需要重绘的条件是该View不可见并且未进行动画 2、接下来的if语句是来进一步判断View是否需要绘制，其中表达式 (mPrivateFlags & (DRAWN | HAS\_BOUNDS)) == (DRAWN | HAS\_BOUNDS)的意思指的是如果View需要重绘并且其大小不为0，其余几个本人也未完全理解，还望高手指点～～如果需要重绘，则处理相关标志位 3、对于开启硬件加速的应用程序，则调用父视图的invalidateChild函数绘制整个区域，否则只绘制dirty区域（r变量所指的区域），这是一个向上回溯的过程，每一层的父View都将自己的显示区域与传入的刷新Rect做交集。 接下来看invalidateChild()的 实现过程：

**\[java\]** [view plain](http://blog.csdn.net/zjmdp/article/details/7713209# "view plain")[copy](http://blog.csdn.net/zjmdp/article/details/7713209# "copy")

1.  public final void invalidateChild(View child, final Rect dirty) {
2.      if (ViewDebug.TRACE_HIERARCHY) {
3.          ViewDebug.trace(this, ViewDebug.HierarchyTraceType.INVALIDATE_CHILD);
4.      }

6.      ViewParent parent = this;

8.      final AttachInfo attachInfo = mAttachInfo;
9.      if (attachInfo != null) {
10.          // If the child is drawing an animation, we want to copy this flag onto
11.          // ourselves and the parent to make sure the invalidate request goes
12.          // through
13.          final boolean drawAnimation = (child.mPrivateFlags & DRAW\_ANIMATION) == DRAW\_ANIMATION;

15.          if (dirty == null) {
16.              if (child.mLayerType != LAYER\_TYPE\_NONE) {
17.                  mPrivateFlags |= INVALIDATED;
18.                  mPrivateFlags &= ~DRAWING\_CACHE\_VALID;
19.                  child.mLocalDirtyRect.setEmpty();
20.              }
21.              do {
22.                  View view = null;
23.                  if (parent instanceof View) {
24.                      view = (View) parent;
25.                      if (view.mLayerType != LAYER\_TYPE\_NONE) {
26.                          view.mLocalDirtyRect.setEmpty();
27.                          if (view.getParent() instanceof View) {
28.                              final View grandParent = (View) view.getParent();
29.                              grandParent.mPrivateFlags |= INVALIDATED;
30.                              grandParent.mPrivateFlags &= ~DRAWING\_CACHE\_VALID;
31.                          }
32.                      }
33.                      if ((view.mPrivateFlags & DIRTY_MASK) != 0) {
34.                          // already marked dirty - we're done
35.                          break;
36.                      }
37.                  }

39.                  if (drawAnimation) {
40.                      if (view != null) {
41.                          view.mPrivateFlags |= DRAW_ANIMATION;
42.                      } else if (parent instanceof ViewRootImpl) {
43.                          ((ViewRootImpl) parent).mIsAnimating = true;
44.                      }
45.                  }

47.                  if (parent instanceof ViewRootImpl) {
48.                      ((ViewRootImpl) parent).invalidate();
49.                      parent = null;
50.                  } else if (view != null) {
51.                      if ((view.mPrivateFlags & DRAWN) == DRAWN ||
52.                              (view.mPrivateFlags & DRAWING\_CACHE\_VALID) == DRAWING\_CACHE\_VALID) {
53.                          view.mPrivateFlags &= ~DRAWING\_CACHE\_VALID;
54.                          view.mPrivateFlags |= DIRTY;
55.                          parent = view.mParent;
56.                      } else {
57.                          parent = null;
58.                      }
59.                  }
60.              } while (parent != null);
61.          } else {
62.              // Check whether the child that requests the invalidate is fully opaque
63.              final boolean isOpaque = child.isOpaque() && !drawAnimation &&
64.                      child.getAnimation() == null;
65.              // Mark the child as dirty, using the appropriate flag
66.              // Make sure we do not set both flags at the same time
67.              int opaqueFlag = isOpaque ? DIRTY_OPAQUE : DIRTY;

69.              if (child.mLayerType != LAYER\_TYPE\_NONE) {
70.                  mPrivateFlags |= INVALIDATED;
71.                  mPrivateFlags &= ~DRAWING\_CACHE\_VALID;
72.                  child.mLocalDirtyRect.union(dirty);
73.              }

75.              final int\[\] location = attachInfo.mInvalidateChildLocation;
76.              location\[CHILD\_LEFT\_INDEX\] = child.mLeft;
77.              location\[CHILD\_TOP\_INDEX\] = child.mTop;
78.              Matrix childMatrix = child.getMatrix();
79.              if (!childMatrix.isIdentity()) {
80.                  RectF boundingRect = attachInfo.mTmpTransformRect;
81.                  boundingRect.set(dirty);
82.                  //boundingRect.inset(-0.5f, -0.5f);
83.                  childMatrix.mapRect(boundingRect);
84.                  dirty.set((int) (boundingRect.left - 0.5f),
85.                          (int) (boundingRect.top - 0.5f),
86.                          (int) (boundingRect.right + 0.5f),
87.                          (int) (boundingRect.bottom + 0.5f));
88.              }

90.              do {
91.                  View view = null;
92.                  if (parent instanceof View) {
93.                      view = (View) parent;
94.                      if (view.mLayerType != LAYER\_TYPE\_NONE &&
95.                              view.getParent() instanceof View) {
96.                          final View grandParent = (View) view.getParent();
97.                          grandParent.mPrivateFlags |= INVALIDATED;
98.                          grandParent.mPrivateFlags &= ~DRAWING\_CACHE\_VALID;
99.                      }
100.                  }

102.                  if (drawAnimation) {
103.                      if (view != null) {
104.                          view.mPrivateFlags |= DRAW_ANIMATION;
105.                      } else if (parent instanceof ViewRootImpl) {
106.                          ((ViewRootImpl) parent).mIsAnimating = true;
107.                      }
108.                  }

110.                  // If the parent is dirty opaque or not dirty, mark it dirty with the opaque
111.                  // flag coming from the child that initiated the invalidate
112.                  if (view != null) {
113.                      if ((view.mViewFlags & FADING\_EDGE\_MASK) != 0 &&
114.                              view.getSolidColor() == 0) {
115.                          opaqueFlag = DIRTY;
116.                      }
117.                      if ((view.mPrivateFlags & DIRTY_MASK) != DIRTY) {
118.                          view.mPrivateFlags = (view.mPrivateFlags & ~DIRTY_MASK) | opaqueFlag;
119.                      }
120.                  }

122.                  parent = parent.invalidateChildInParent(location, dirty);
123.                  if (view != null) {
124.                      // Account for transform on current parent
125.                      Matrix m = view.getMatrix();
126.                      if (!m.isIdentity()) {
127.                          RectF boundingRect = attachInfo.mTmpTransformRect;
128.                          boundingRect.set(dirty);
129.                          m.mapRect(boundingRect);
130.                          dirty.set((int) boundingRect.left, (int) boundingRect.top,
131.                                  (int) (boundingRect.right + 0.5f),
132.                                  (int) (boundingRect.bottom + 0.5f));
133.                      }
134.                  }
135.              } while (parent != null);
136.          }
137.      }
138.  }

  大概流程如下，我们主要关注dirty区域不是null（非硬件加速）的情况： 1、判断子视图是否是不透明的（不透明的条件是isOpaque()返回true，视图未进行动画以及child.getAnimation() == null），并将判断结果保存到变量isOpaque中，如果不透明则将变量opaqueFlag设置为DIRTY\_OPAQUE，否则设置为DIRTY。 2、定义location保存子视图的左上角坐标 3、如果子视图正在动画，那么父视图也要添加动画标志，如果父视图是ViewGroup，那么给mPrivateFlags添加DRAW\_ANIMATION标识，如果父视图是ViewRoot，则给其内部变量mIsAnimating赋值为true 4、设置dirty标识，如果子视图是不透明的，则父视图设置为DIRTY_OPAQUE，否则设置为DIRTY 5、调用parent.invalidateChildInparent()，这里的parent有可能是ViewGroup，也有可能是ViewRoot（最后一次while循环），首先来看ViewGroup, ViewGroup中该函数的主要作用是对dirty区域进行计算 以上过程的主体是一个do{}while{}循环，不断的将子视图的dirty区域与父视图做运算来确定最终要重绘的dirty区域，最终循环到ViewRoot（ViewRoot的parent为null）为止，并将dirty区域保存到ViewRoot的mDirty变量中

**\[java\]** [view plain](http://blog.csdn.net/zjmdp/article/details/7713209# "view plain")[copy](http://blog.csdn.net/zjmdp/article/details/7713209# "copy")

1.  /**
2.       * Don't call or override this method. It is used for the implementation of
3.       * the view hierarchy.
4.       *
5.       * This implementation returns null if this ViewGroup does not have a parent,
6.       * if this ViewGroup is already fully invalidated or if the dirty rectangle
7.       * does not intersect with this ViewGroup's bounds.
8.       */
9.      public ViewParent invalidateChildInParent(final int\[\] location, final Rect dirty) {
10.          if (ViewDebug.TRACE_HIERARCHY) {
11.              ViewDebug.trace(this, ViewDebug.HierarchyTraceType.INVALIDATE\_CHILD\_IN_PARENT);
12.          }

14.          if ((mPrivateFlags & DRAWN) == DRAWN ||
15.                  (mPrivateFlags & DRAWING\_CACHE\_VALID) == DRAWING\_CACHE\_VALID) {
16.              if ((mGroupFlags & (FLAG\_OPTIMIZE\_INVALIDATE | FLAG\_ANIMATION\_DONE)) !=
17.                          FLAG\_OPTIMIZE\_INVALIDATE) {
18.                  dirty.offset(location\[CHILD\_LEFT\_INDEX\] - mScrollX,
19.                          location\[CHILD\_TOP\_INDEX\] - mScrollY);

21.                  final int left = mLeft;
22.                  final int top = mTop;

24.                  if ((mGroupFlags & FLAG\_CLIP\_CHILDREN) != FLAG\_CLIP\_CHILDREN ||
25.                          dirty.intersect(0, 0, mRight - left, mBottom - top) ||
26.                          (mPrivateFlags & DRAW\_ANIMATION) == DRAW\_ANIMATION) {
27.                      mPrivateFlags &= ~DRAWING\_CACHE\_VALID;

29.                      location\[CHILD\_LEFT\_INDEX\] = left;
30.                      location\[CHILD\_TOP\_INDEX\] = top;

32.                      if (mLayerType != LAYER\_TYPE\_NONE) {
33.                          mLocalDirtyRect.union(dirty);
34.                      }

36.                      return mParent;
37.                  }
38.              } else {
39.                  mPrivateFlags &= ~DRAWN & ~DRAWING\_CACHE\_VALID;

41.                  location\[CHILD\_LEFT\_INDEX\] = mLeft;
42.                  location\[CHILD\_TOP\_INDEX\] = mTop;
43.                  if ((mGroupFlags & FLAG\_CLIP\_CHILDREN) == FLAG\_CLIP\_CHILDREN) {
44.                      dirty.set(0, 0, mRight - mLeft, mBottom - mTop);
45.                  } else {
46.                      // in case the dirty rect extends outside the bounds of this container
47.                      dirty.union(0, 0, mRight - mLeft, mBottom - mTop);
48.                  }

50.                  if (mLayerType != LAYER\_TYPE\_NONE) {
51.                      mLocalDirtyRect.union(dirty);
52.                  }

54.                  return mParent;
55.              }
56.          }

58.          return null;
59.      }

该函数首先调用offset将子视图的坐标位置转换为在父视图（当前视图）的显示位置，这里主要考虑scroll后导致子视图在父视图中的显示区域会发生变化，接着调用union函数求得当前视图与子视图的交集,求得的交集必定是小于dirty的范围，因为子视图的dirty区域有可能超出其父视图（当前视图）的范围，最后返回当前视图的父视图。 再来看ViewRoot中invalidateChildInparent的执行过程：

**\[java\]** [view plain](http://blog.csdn.net/zjmdp/article/details/7713209# "view plain")[copy](http://blog.csdn.net/zjmdp/article/details/7713209# "copy")

1.  public ViewParent invalidateChildInParent(final int\[\] location, final Rect dirty) {
2.          invalidateChild(null, dirty);
3.          return null;
4.      }

该函数仅仅调用了ViewRoot的invalidateChild，下面继续看invalidateChild的源码：

**\[java\]** [view plain](http://blog.csdn.net/zjmdp/article/details/7713209# "view plain")[copy](http://blog.csdn.net/zjmdp/article/details/7713209# "copy")

1.  public void invalidateChild(View child, Rect dirty) {
2.          checkThread();
3.          if (DEBUG_DRAW) Log.v(TAG, "Invalidate child: " + dirty);
4.          if (dirty == null) {
5.              // Fast invalidation for GL-enabled applications; GL must redraw everything
6.              invalidate();
7.              return;
8.          }
9.          if (mCurScrollY != 0 || mTranslator != null) {
10.              mTempRect.set(dirty);
11.              dirty = mTempRect;
12.              if (mCurScrollY != 0) {
13.                 dirty.offset(0, -mCurScrollY);
14.              }
15.              if (mTranslator != null) {
16.                  mTranslator.translateRectInAppWindowToScreen(dirty);
17.              }
18.              if (mAttachInfo.mScalingRequired) {
19.                  dirty.inset(-1, -1);
20.              }
21.          }
22.          if (!mDirty.isEmpty() && !mDirty.contains(dirty)) {
23.              mAttachInfo.mSetIgnoreDirtyState = true;
24.              mAttachInfo.mIgnoreDirtyState = true;
25.          }
26.          mDirty.union(dirty);
27.          if (!mWillDrawSoon) {
28.              scheduleTraversals();
29.          }
30.      }

具体分析如下： 1、判断此次调用是否在UI线程中进行 2、将dirty的坐标位置转换为ViewRoot的屏幕显示区域 3、更新mDirty变量，并调用scheduleTraversals发起重绘请求 至此一次invalidate()就结束了 总结：invalidate主要给需要重绘的视图添加DIRTY标记，并通过和父视图的矩形运算求得真正需要绘制的区域，并保存在ViewRoot中的mDirty变量中，最后调用scheduleTraversals发起重绘请求，scheduleTraversals会发送一个异步消息，最终调用performTraversals()执行重绘，performTraversals()的具体过程以后再分析。 以上所有代码基于Android 4.0.4，并结合《Android内核剖析》分析总结而成，源码中涉及到的部分细节本人也未完全理解，还望高手指点~~