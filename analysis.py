import numpy as np
import pandas as pd
import scipy.stats as stats
import seaborn as sns
import matplotlib.pyplot as plt

# Define the data for coders and non-coders
coders = np.array([
    [4.5, 4.5, 4.5, 5, 5],  # Pair A
    [3, 5, 1, 3.5, 2.5],    # Pair B
    [4.5, 4.5, 4.5, 4.5, 5],  # Pair C
    [4.5, 3.5, 3.5, 5, 4],    # Pair D
    [5, 5, 5, 5, 5]           # Pair E
])

# Define the labels for the groups
engaged_indices = [2, 4]  # Pairs C and E (Engaged)
non_engaged_indices = [0, 1, 3]  # Pairs A, B, D (Non-Engaged)

# Engagement scores for the groups
engaged_scores = coders[engaged_indices, 0]
non_engaged_scores = coders[non_engaged_indices, 0]

# 2. Independent t-test on Engagement Scores
t_stat, p_value = stats.ttest_ind(engaged_scores, non_engaged_scores)

# 3. Correlation Analysis (Pearson correlation)
correlations_engaged = np.corrcoef(coders[engaged_indices, :].T)
correlations_non_engaged = np.corrcoef(coders[non_engaged_indices, :].T)

# 4. Data Visualization

# Boxplot of Engagement Scores
plt.figure(figsize=(10, 6))
sns.boxplot(data=[engaged_scores, non_engaged_scores])
plt.xticks([0, 1], ['Engaged (C, E)', 'Non-Engaged (A, B, D)'])
plt.ylabel('Engagement Scores')
plt.title('Engagement Scores Comparison between Engaged and Non-Engaged Pairs')
plt.show()

# Scatter plots of correlations between engagement and other factors
metrics = ['Engagement', 'Novelty', 'Challenge', 'Exploration', 'Enjoyment']
engaged_data = coders[engaged_indices, :]
non_engaged_data = coders[non_engaged_indices, :]

# Scatter plot for engaged group
plt.figure(figsize=(14, 8))
for i, metric in enumerate(metrics[1:]):
    plt.subplot(2, 3, i+2)
    plt.scatter(engaged_data[:, 0], engaged_data[:, i+1], color='blue', label='Engaged')
    plt.title(f'Engagement vs {metric}')
    plt.xlabel('Engagement')
    plt.ylabel(f'{metric}')
    plt.grid(True)
plt.tight_layout()

# Heatmap for correlation matrices
fig, ax = plt.subplots(1, 2, figsize=(14, 6))

sns.heatmap(correlations_engaged, annot=True, cmap='coolwarm', xticklabels=metrics, yticklabels=metrics, ax=ax[0])
ax[0].set_title('Correlations - Engaged Pairs (C, E)')

sns.heatmap(correlations_non_engaged, annot=True, cmap='coolwarm', xticklabels=metrics, yticklabels=metrics, ax=ax[1])
ax[1].set_title('Correlations - Non-Engaged Pairs (A, B, D)')

plt.tight_layout()
plt.show()

# Results of t-test
print(f"T-statistic: {t_stat}")
print(f"P-value: {p_value}")